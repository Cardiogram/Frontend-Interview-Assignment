import * as d3 from 'd3';

function generateYTicks(chart) {
  return d3.axisLeft()
    .scale(chart.scale.yScale)
    .ticks(7)
    .tickSize(-chart.width);
}

function generateXTicks(chart) {
  const ticks = window.innerWidth < 500 ? 3 : 6;
  return d3.axisBottom()
    .scale(chart.scale.xScale)
    .tickArguments([ticks, '%I:%M %p']);
}

function setupLinearGradient(chart, svg) {
  svg.append('linearGradient')
    .attr('id', 'heartrate-gradient')
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', chart.scale.yScale(50))
    .attr('y2', chart.scale.yScale(100))
    .selectAll('stop')
      .data([
        { offset: '0%', color: '#00C0EF' },
        { offset: '30%', color: '#f58f29' },
        { offset: '80%', color: '#f58f29' },
        { offset: '100%', color: '#ff543b' }
      ])
    .enter()
      .append('stop')
      .attr('offset', (d) => d.offset)
      .attr('stop-color', (d) => d.color);
}


function generateScales(chart) {
  const cardiogram = chart.cardiogram;
  return {
    xScale: d3.scaleTime()
      .domain([
        new Date(cardiogram.start),
        new Date(cardiogram.end),
      ])
      .rangeRound([0, chart.width]),
    yScale: d3.scaleLinear()
      .domain([40, d3.max(cardiogram.data, (d) => d.value)])
      .range([chart.height, 0])
  };
}

function generateAxis(chart) {
  return {
    yAxis: generateYTicks(chart),
    xAxis: generateXTicks(chart)
  };
}

function generateSVG(chart) {
  const svg = d3.select(chart.element)
    .append('svg')
    .attr('width', chart.width + chart.margin.left + chart.margin.right)
    .attr('height', chart.height + chart.margin.top + chart.margin.bot)
    .append('g');

  svg.attr('transform', `translate(${chart.margin.left}, ${chart.margin.top})`);

  if (chart.type === 'line') {
    setupLinearGradient(chart, svg);
  }

  svg.append('g')
    .attr('class', 'grid axis y')
    .call(chart.axis.yAxis);

  svg.append('g')
    .attr('class', 'axis x')
    .attr('transform', `translate(0, ${chart.height - 5})`)
    .call(chart.axis.xAxis);

  return svg;
}

function generateOverlay(chart) {
  let tooltip = d3.select('.graph-tooltip');
  const focus = chart.svg.append('g')
      .attr('class', 'focus hidden');

  focus.append('line')
    .attr('class', 'focus-line')
    .attr('y1', 0)
    .attr('y2', chart.height);

  focus.append('circle')
    .attr('class', 'focus-point')
    .attr('r', 4.5);

  if (tooltip.empty()) {
    tooltip = d3.select('body').append('div')
      .attr('class', 'graph-tooltip');
  }

  const overlay = chart.svg.append('rect')
    .attr('class', 'overlay')
    .attr('width', chart.width)
    .attr('height', chart.height);

  return { focus, overlay, tooltip };
}

function getOffset(el) {
  const bb = el.getBoundingClientRect();
  return {
    left: bb.left + window.scrollX,
    top: bb.top + window.scrollY
  };
}

function addOverlayEvents(chart) {
  const data = chart.cardiogram.data;
  const bisectDate = d3.bisector((d) => d.start).left;
  const { overlay, focus, tooltip } = chart.eventHandler;
  const { xScale, yScale } = chart.scale;
  const timeFormatter = d3.timeFormat('%I:%M %p');

  function mousemove() {
    const x0 = chart.scale.xScale.invert(d3.mouse(this)[0]);
    const i = bisectDate(data, x0, 1);
    const d0 = data[i - 1];
    const d1 = data[i];
    const d = x0 - d0.start > d1.start - x0 ? d1 : d0;

    focus.attr('transform', `translate(${xScale(d.start)},${yScale(d.value)})`);
    focus.select('.focus-line')
      .attr('y2', chart.height - yScale(d.value));

    const focusPointPos = getOffset(focus.select('.focus-point').node());

    tooltip.html(`<span>${d.value} bpm</span><span>${timeFormatter(d.start)}</span>`)
      .style('left', `${focusPointPos.left - 36}px`)
      .style('top', `${focusPointPos.top - 50}px`);
  }

  overlay
    .on('mouseover', () => { focus.classed('show', true); tooltip.classed('show', true); })
    .on('mouseout', () => { focus.classed('show', false); tooltip.classed('show', false); })
    .on('mousemove', mousemove);
}

function removeOverlayEvents(chart) {
  const eventHandlers = chart.eventHandler;
  if (eventHandlers) {
    eventHandlers.tooltip.classed('show', false);
    eventHandlers.focus.attr('class', 'focus hidden');
    eventHandlers.overlay
      .on('mouseover', null)
      .on('mouseout', null)
      .on('mousemove', null);
  }
}

export default class Chart {
  constructor(chartConfig = { margin: {} }) {
    Object.assign(this, chartConfig);
  }

  initiate(container) {
    this.element = container;
    this.width = container.offsetWidth - this.margin.left - this.margin.right;
    this.height = container.offsetHeight - this.margin.top - this.margin.bot;

    return this;
  }

  setupChart(cardiogram) {
    this.cardiogram = cardiogram;
    this.scale = generateScales(this);
    this.axis = generateAxis(this);
    this.svg = generateSVG(this);

    return this;
  }

  addEvents() {
    if (!this.eventHandler) this.eventHandler = generateOverlay(this);
    addOverlayEvents(this);
  }

  removeEvents() {
    removeOverlayEvents(this);
  }
}
