export function postRequest(path, object) {
  return fetch(path, {
    method: "POST",
    body: JSON.stringify(object),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}

export function getRequest(path) {
  return fetch(`${process.env.BASE_URL}${path}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}
