const BAR_HEIGHT = 20;
const BAR_SPACING = 35;
const TEXT_OFFSET = 18;

d3.json("/data/2019.json").then((data) => {
    const topTen = data.filter((data, item) => item < 10)
    console.log(topTen)

    const countries = document.querySelector(".countries")
    countries.innerHTML = `Number of Countries: ${data.length}`


    d3.select('svg#gdp')
      .selectAll('rect')
      .data(topTen)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('height', BAR_HEIGHT)
      .attr('y', (d, i) => i * BAR_SPACING)
      .attr('width', (d, i) => d["GDP per capita"] * 100)
      .attr('stroke', '#000')
      .attr('fill', 'green')
      
    d3.select('svg#gdp')
    .selectAll('text')
    .data(topTen)
    .enter()
    .append('text')
    .attr('x', 5)
    .attr('y', (d, i) => i * BAR_SPACING + 15)
    .attr('font-size', '10pt')
    .attr('color', "#000")
    .text((d, i) => `${d["Country or region"]}: ${d["GDP per capita"]}`)


    d3.select('svg#social')
      .selectAll('rect')
      .data(topTen)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 35)
      .attr('height', (d,i) => d["Social support"] * 100)
      .attr('y', 0)
      .attr('width', 30)
      .attr('fill', 'blue')

    d3.select('svg#social')
      .selectAll('text')
      .data(topTen)
      .enter()
      .append('text')
      .attr('x', -140)
      .attr('y', (d, i) => (i * 35) + 20)
      .attr('font-size', '10pt')
      .attr('transform', 'rotate(270)')
      .attr('fill', '#fff')
      .text((d, i) => `${d["Country or region"]}: ${d["Social support"]}`)


    const xScale = d3
      .scaleLinear()
      .domain([1, 11])
      .range([40, 500])

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(topTen, d => d["Healthy life expectancy"]))
      .range([50, 150])

    const labelScale = d3
      .scaleOrdinal()
      .domain([0, 11])
      .range(['Finland', 'Denmark', 'Norway', 'Iceland', 'Netherlands', 'Switzerland' , 'Sweden', 'New Zealand', 'Canada', 'Austria'])


    d3.select('svg#life')
      .style('border', '1px solid #000')
      .selectAll('circle')
      .data(topTen)
      .enter()
      .append('circle')
      .attr('r', '10px')
      .attr('cx', (d) => xScale(d['Overall rank']))
      .attr('cy', (d) => yScale(d["Healthy life expectancy"]))
      .attr('fill', 'red')

    d3.select('svg#life')
      .selectAll('text')
      .data(topTen)
      .enter()
      .append('text')
      .attr('font-size', '10pt')
      .text(d => labelScale(d["Country or region"]))
      .attr('x', (d) => xScale(d['Overall rank']))
      .attr('y', (d) => yScale(d["Healthy life expectancy"]))

    d3.select('svg#generous')
      .selectAll('rect')
      .data(topTen)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('height', BAR_HEIGHT)
      .attr('y', (d, i) => i * BAR_SPACING)
      .attr('width', (d, i) => (d["Generosity"] * 100) + 100)
      .attr('stroke', '#000')
      .attr('fill', 'cornflowerblue')

    d3.select('svg#generous')
      .selectAll('text')
      .data(topTen)
      .enter()
      .append('text')
      .attr('x', 5)
      .attr('y', (d, i) => i * BAR_SPACING + 15)
      .attr('font-size', '10pt')
      .text((d, i) => `${d["Country or region"]}: ${(d["Generosity"] * 100).toFixed(0)}%`)
})

