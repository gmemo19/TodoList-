
export const postData = async (path,body) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(body)
    };
    const response = await fetch(path, requestOptions);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    alert("Api hatasi");
    return;
  };

  export const putData = async (path,body) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(body)
    };
    const response = await fetch(path, requestOptions);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    alert("Api hatasi");
    return;
  };

  export const deleteData = async (path) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
    };
    const response = await fetch(path, requestOptions);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    alert("Api hatasi");
    return;
  };