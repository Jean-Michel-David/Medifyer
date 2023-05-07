function deconnexion(){
  if(localStorage.getItem('authenticationToken')){
  localStorage.removeItem('authenticationToken');
  console.log("User deconnected with succes");
  return true;
  } else {
    console.log("Failure");
    return false;
  }
}
