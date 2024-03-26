fetch("http://localhost:8080/api/v1/clothings")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Handle the data received from the endpoint
    console.log(data);
  })
  .catch((error) => {
    // Handle any errors that occur during the fetch operation
    console.error("Error fetching data:", error);
  });
