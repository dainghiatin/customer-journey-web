

export const getCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flags");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const countries = await response.json();
    return countries.map(country => ({
      vi: country.name.common,
      en: country.name.common,
      flag: country.flags.svg
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}



export const getCountryByCode = async (name) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ country: name });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", requestOptions);
    const country = await response.json();

    const provices = country.data.states.map(state => ({
      vi: state.name,
      en: state.name,
    }));
    return provices;
  } catch (error) {
    console.error("Error fetching country by code:", error);
    return [];
  }
};

export const getDistrictByCode = async (province) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ state: province });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", requestOptions);
    const result = await response.json();

    const districts = result.data.map(district => ({
      vi: district,
      en: district,
    }));
    return districts;
  } catch (error) {
    console.error("Error fetching districts by province code:", error);
    return [];
  }
};
