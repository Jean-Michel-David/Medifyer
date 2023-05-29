function deconnexion(){
  if(localStorage.getItem('authenticationToken')){
  localStorage.removeItem('authenticationToken');
  return true;
  } else {
    return false;
  }
}
