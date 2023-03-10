// Check if user has entered valid password for editing / adding or deliting recipes

const authorized = () => {
  let key = sessionStorage.getItem("accesss_key");

  const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;

  if (key === accessKey) {
    return true;
  }
  return false;
};

export default authorized;
