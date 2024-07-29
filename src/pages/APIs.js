const baseUrl = `${import.meta.env.VITE_BE_URL}`;

// Authentication APIs

//**  Registration
const registerUser = async (userDetails) => {
    try {
        const response = await fetch(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json", 
            },
            body: JSON.stringify(userDetails),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log(`Error while Registering the User`, error)
    }
    return undefined;
};

const loginUser = async (userCreds) => {

    const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(userCreds),
    });
    if(response.status === 401 || response.status === 400) {
        const { msg } = await response.json();
        throw new Error(msg);
    }
    return await response.json();

};

const forgotPassword = async (email) => {
    try { 
      const response = await fetch(`${baseUrl}/auth/forgot-password`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send forgot password email');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      
    }
    return undefined;
  };

export { registerUser, loginUser, forgotPassword };