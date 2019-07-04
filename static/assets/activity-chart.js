const data01 = [
  { day: 'monday', index: 1, value: 0 },
  { day: 'tuesday', index: 1, value: 180 },
  { day: 'wednesday', index: 1, value: 150 },
  { day: 'thursday', index: 1, value: 120 },
  { day: 'friday', index: 1, value: 200 },
  { day: 'saturday', index: 1, value: 300 },
  { day: 'sunday', index: 1, value: 400 },
];

const data02 = [
  { day: '12a', index: 1, value: 160 },
  { day: '1a', index: 1, value: 180 },
  { day: '2a', index: 1, value: 150 },
  { day: '3a', index: 1, value: 120 },
  { day: '4a', index: 1, value: 200 },
  { day: '5a', index: 1, value: 300 },
  { day: '6a', index: 1, value: 100 },
];

const parseDomain = () => {
  return [
    0,
    Math.max.apply(null, [
      ...data01.map(entry => entry.value),
      ...data02.map(entry => entry.value)
    ])
  ];
};

const domain = parseDomain();
const range = [6, 300];


<div className="days">
  <span>M</span>
  <span>T</span>
  <span>W</span>
  <span>T</span>
  <span>F</span>
  <span>S</span>
  <span>S</span>
</div>
<ScatterChart width={400} height={60} margin={{top: 10, right: 0, bottom: 0, left: 0}}>
  <YAxis type="number" dataKey="index" name="sunday" height={10} width={80} tick={false} tickLine={false} axisLine={false} />
  <ZAxis type="number" dataKey="value" domain={domain} range={range}/>
  <Scatter data={data01} fill='#3424AC'/>
</ScatterChart>
<ScatterChart width={400} height={60} margin={{top: 10, right: 0, bottom: 0, left: 0}}>
  <YAxis type="number" dataKey="index" height={10} width={80} tick={false} tickLine={false} axisLine={false}/>
  <ZAxis type="number" dataKey="value" domain={domain} range={range} />
  <Scatter data={data02} fill='#3424AC'/>
</ScatterChart>
<ScatterChart width={400} height={60} margin={{top: 10, right: 0, bottom: 0, left: 0}}>
  <YAxis type="number" dataKey="index" name="sunday" height={10} width={80} tick={false} tickLine={false} axisLine={false} />
  <ZAxis type="number" dataKey="value" domain={domain} range={range}/>
  <Scatter data={data01} fill='#3424AC'/>
</ScatterChart>
<ScatterChart width={400} height={60} margin={{top: 10, right: 0, bottom: 0, left: 0}}>
  <YAxis type="number" dataKey="index" height={10} width={80} tick={false} tickLine={false} axisLine={false}/>
  <ZAxis type="number" dataKey="value" domain={domain} range={range} />
  <Scatter data={data02} fill='#3424AC'/>
</ScatterChart>
</div>
