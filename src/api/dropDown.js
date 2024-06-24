const baseURL = `${import.meta.env.VITE_APP_AXIOSBASEURL}/`;

export async function getSectorDetails() {
  let data = null;
  await fetch(`${baseURL}users/sectors/`)
    .then((res) => res.json())
    .then((json) => (data = json))
    .catch((err) => {
      console.log(err.message);
    });

  return data;
}
// getProfessionDetails
export async function getProfessionDetails() {
  let data = null;
  await fetch(`${baseURL}users/prof_cats/`)
    .then((res) => res.json())
    .then((json) => (data = json))
    .catch((err) => {
      console.log(err.message);
    });

  return data;
}
// getSoftwareDetails
export async function getSoftwareDetails() {
  // let data = null
  let data = [
    {
      name: "GitLab",
    },
    {
      name: "GitHub",
    },
    {
      name: "VSCode",
    },
    {
      name: "Postman",
    },
  ];
  await fetch(`${baseURL}users/prof_cats/`)
    .then((res) => data.json())
    .then((json) => (data = json))
    .catch((err) => {
      console.log(err.message);
    });

  return data;
}
