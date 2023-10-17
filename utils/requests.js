export function postRequest(path, object) {
  return fetch(path, {
    method: "POST",
    body: JSON.stringify(object),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}
