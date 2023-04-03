<?php

class User implements JsonSerializable
{
  private $id;
  private $firstname;
  private $lastname;
  private $email;
  private $pwd;
  private $photo;
  private $adminStatus;

  /**
   * Get the value of id
   */
  public function getId()
  {
    return $this->id;
  }
  /**
   * Set the value of id
   *
   * @return  self
   */
  public function setId($id)
  {
    $this->id = $id;

    return $this;
  }
  /**
   * Get the value of firstname
   */
  public function getFirstname()
  {
    return $this->firstname;
  }
  /**
   * Set the value of firstname
   *
   * @return  self
   */
  public function setFirstname($firstname)
  {
    $this->firstname = $firstname;

    return $this;
  }
  /**
   * Get the value of lastname
   */
  public function getLastname()
  {
    return $this->lastname;
  }
  /**
   * Set the value of lastname
   *
   * @return  self
   */
  public function setLastname($lastname)
  {
    $this->lastname = $lastname;

    return $this;
  }
  /**
   * Get the value of email
   */
  public function getEmail()
  {
    return $this->email;
  }
  /**
   * Set the value of email
   *
   * @return  self
   */
  public function setEmail($email)
  {
    $this->email = $email;

    return $this;
  }
  /**
   * Get the value of pwd
   */
  public function getPwd()
  {
    return $this->pwd;
  }
  /**
   * Set the value of pwd
   *
   * @return  self
   */
  public function setPwd($pwd)
  {
    $this->pwd = $pwd;

    return $this;
  }
  /**
   * Get the value of photo
   */
  public function getPhoto()
  {
    return $this->photo;
  }
  /**
   * Set the value of photo
   *
   * @return  self
   */
  public function setPhoto($photo)
  {
    $this->photo = $photo;

    return $this;
  }

  /**
   * returns isAdmin
   */
  public function isAdmin() {
    return $this->adminStatus;
  }
  /**
   * Set the value of adminStatus
   */
  public function setAdminStatus($status) {
    $this->adminStatus = $status;

    return $this;
  }

  public function jsonSerialize(): mixed
  {
    return array(
      'id' => $this->getId(),
      'firstname' => $this->getFirstname(),
      'lastname' => $this->getLastname(),
      'email' => $this->getEmail(),
      'pwd' => $this->getPwd(),
      'photo' => $this->getPhoto(),
      'adminStatus' => $this->isAdmin()
    );
  }
}
