const baseURL = `${import.meta.env.VITE_APP_AXIOSBASEURL}/`;

export async function saveAchievements(data, token) {
      //console.log(data, token);
      if (data) {
        await fetch(`${baseURL}user_profile/achievements/`, {
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