export async function get<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
  });

  return (await response.json()) as T;
}

export async function post<T, S>(url: string, bodyData: T): Promise<S> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  return (await response.json()) as S;
}

export async function update<T, S>(url: string, bodyData: T): Promise<S> {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  return (await response.json()) as S;
}
export async function remove<T>(url: string): Promise<T | void> {
  const response = await fetch(url, { method: "DELETE" });

  if (!response.ok) {
    throw new Error(
      `Misslyckades att radera: ${response.status} ${response.statusText}`
    );
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as T;
  }
}
