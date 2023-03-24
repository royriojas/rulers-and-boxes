import dayjs from 'dayjs';

export const now = () => {
  return dayjs();  
};

export const genURL = (cid, { fromNow = 7, unit = 'd' } = {}) => {
  const toDate = now();
  const fromDate = toDate.subtract(fromNow, unit);

  const logsURL = [
    process.env.DATADOG_URL + '/logs?query=%28%40correlation_id%3A',
    '%20OR%20%40api.http.dc-cid%3A',
    '%20OR%20dc-cid%3A',
    `%29&cols=host%2Cservice&index=%2A&messageDisplay=inline&stream_sort=time%2Cdesc&viz=stream&from_ts=${fromDate.valueOf()}&to_ts=${toDate.valueOf()}&live=true`,
  ];

  return logsURL.join(cid);
};

