let lastId = 0;

export default function (prefix = "dv_id_") {
  lastId++;
  return `${prefix}${lastId}`;
}
