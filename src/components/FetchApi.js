export async function addNote(apiURL, body) {
    const request = fetch(`${apiURL}notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const result = await request;

    if (!result.ok) {
      console.error('Ошибка');

      return;
    }

}

export async function removeNote(apiURL, id) {
    const query = `notes/${encodeURIComponent(id)}`;

    const request = fetch(apiURL + query, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });

    const result = await request;

    if (!result.ok) {
      console.error('Ошибка!');
    }
}

export async function refresh(apiURL) {
    const request = fetch(`${apiURL}notes/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await request;

    if (!result.ok) {
      console.error('Ошибка');

      return;
    }

    return await result.json();
}