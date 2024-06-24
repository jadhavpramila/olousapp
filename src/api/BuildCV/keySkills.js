const baseURL = `${import.meta.env.VITE_APP_AXIOSBASEURL}/`;

export async function saveKeySkills(data, token) {
//   console.log(data, token);
  if (data) {
    await fetch(`${baseURL}user_profile/key_skills/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => (data = json))
      .catch((err) => {
        console.log(err.message);
      });
  }
  return data;
}
