// const baseURL = "https://api.dev.olous.app/api/v1/";
const baseURL = `${import.meta.env.VITE_APP_AXIOSBASEURL}/`

// search data
export async function getData(query, type, filter){
    let details=null;
    if(query){
        if(filter === 'all')
        {
            console.log( filter)
            await fetch(`${baseURL}search/${type}/?q=${query}&index[]=post&index[]=headline&index[]=document`)
                .then(res => res.json())
                .then(json => details = json.data.responses )
                .catch(err => {console.log(err.message)})

        }else{
            await fetch(`${baseURL}search/${type}/?q=${query}&index[]=${filter}`)
                .then(res => res.json())
                .then(json => details = json.data.responses )
                .catch(err => {console.log(err.message)})
        }
      
    }
    return details
}

export async function getCompanyData(query, type, filter){
    let details=null;
    if(query){
        if(filter === 'all')
        {
            console.log( filter)
            await fetch(`${baseURL}search/${type}/?q=${query}&index[]=post&index[]=headline&index[]=document`)
                .then(res => res.json())
                .then(json => details = json.data )
                .catch(err => {console.log(err.message)})

        }else{
            await fetch(`${baseURL}search/${type}/?q=${query}&index[]=${filter}`)
                .then(res => res.json())
                .then(json => details = json.data )
                .catch(err => {console.log(err.message)})
        }
      
    }
    return details
}


//get interests
export async function getInterests() {
    let interests = null
    await fetch(`${baseURL}users/interests/some`)
        .then(res => res.json())
        .then(json => interests = json )
        .catch(err => {console.log(err.message)})

    return interests
}

//Login with email password
export async function userLogin(data){
    let user = null;
    if(data){
        await fetch(`${baseURL}login/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(json => user = json )
        .catch(err => {console.log(err.message)})
    }
    return user
}

//login with email and OTP
export async function userLoginOTP(data){
    let user = null;
    if(data){
        await fetch(`${baseURL}users/get_login_otp/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(json => user = json )
        .catch(err => {console.log(err.message)})
    }
    return user
}

//verify OTP



//signup
export async function userSignUp(data){
    let user = null;
    if(data){
        await fetch(`${baseURL}accounts/registration/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(json => user = json )
        .catch(err => {console.log(err.message)})
    }
    return user
}

// update user data
export async function updateUser(data, accessToken){
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', accessToken);
    let user = null;
    // if(data & accessToken){
        await fetch(`${baseURL}users/update_user/`,{
            method: 'POST',
            headers: header,
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(json => user = json )
        .catch(err => {console.log(err.message)})
    // }
    return user
}

