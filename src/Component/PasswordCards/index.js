const PasswordCards = props => {
  const {details, status, deleteItemPasswaordList} = props
  const {website, id, username, password} = details

  const deleteItem = () => {
    deleteItemPasswaordList(id)
  }

  return (
    <li className="user-details-entered">
      <p>{website[0]}</p>
      <div>
        <p>{website}</p>
        <p>{username}</p>
        {status ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        ) : (
          <p>{password}</p>
        )}
      </div>
      <button type="button" data-testid="delete" onClick={deleteItem}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordCards
