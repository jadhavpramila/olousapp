const baseURL = `${import.meta.env.VITE_APP_AXIOSBASEURL}/`;

export async function saveCertification(data, accessToken) {
      //console.log(data, accessToken);
      if (data & accessToken) {
        await fetch(`${baseURL}user_profile/accreditions/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          mode: "cors",
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((json) => (data = json))
          .catch((err) => {
            console.log(err.message);
            console.log(data);
          });
      }
      return data;
    }

    export async function deleteCertificate(data, accessToken) {
     // console.log(data, accessToken);
      if (data & accessToken) {
        await fetch(`${baseURL}user_profile/accreditions/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          mode: "cors",
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((json) => (data = json))
          .catch((err) => {
            console.log(err.message);
            console.log(data);
          });
      }
      return data;
    }


    