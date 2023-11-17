const Header = () => {
  return(
    <header className="container-fluid d-flex justify-content-end">
      <div className="d-flex align-items-center">
        <div className="text-right mr-3">
          <span className="d-block m-0 p-0 text-white">Barbearia Do Tiozinho</span>
          <small className="m-0 p-0">Plano Premium</small>
        </div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Alisson_Ver%C3%ADssimo_cabeleireiro.jpg" />
        <span className="mdi mdi-chevron-down"></span>
      </div>
    </header>
  )
};

export default Header;
