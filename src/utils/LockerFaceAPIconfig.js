const endpoint = 'https://6076309c0baf7c0017fa79be.mockapi.io/lockerface/deliver';

const lockerFace = async (method) => {
  const response = await fetch(endpoint, method);
  const data = await response.json();
  return data;
};

export default lockerFace;
