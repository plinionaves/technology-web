import Technologies from './components/technologies.js';
import TechnologyForm from './components/technologyForm.js';
import User from './components/user.js';
import Signin from './components/signin.js';
import Signup from './components/signup.js';
import Menu from './components/menu.js';

class App {

    constructor(body, footer) {
        this.signin = new Signin(body);
        this.signup = new Signup(body);
        this.technologies = new Technologies(body);
        this.technologyForm = new TechnologyForm(body);
        this.user = new User(body);
        this.menu = new Menu(footer);
    }

    init() {
        this.signin.render();
        this.addEventListener();
    }

    addEventListener() {
        this.signinEvents();
        this.signupEvents();
        this.technologiesEvents();
        this.technologyFormEvents();
        this.userEvents();
        this.menuEvents();
    }

    signinEvents() {
        this.signin.on('error', () => alert('Erro de autenticação'));
        this.signin.on('signin', (token) => {
            localStorage.setItem('token', `JWT ${token}`);
            this.menu.render('technologies');
            this.technologies.render();
        });
        this.signin.on('signup', () => this.signup.render());
    }

    signupEvents(){
        this.signup.on('error', () => alert('Erro no cadastro'));
        this.signup.on('signup', (returnedData) => {
            alert(`${returnedData.data.name} você foi cadastrado com sucesso!`);
            this.signin.render();
        });
    }

    technologiesEvents() {
        this.technologies.on('error', () => alert('Erro ao listar tecnologias'));
        this.technologies.on('remove-error', () => alert('Erro ao excluir'));
        this.technologies.on('update-error', () => alert('Erro ao atualizar'));
        this.technologies.on('remove', () => this.technologies.render());
        this.technologies.on('update', () => this.technologies.render());
    }

    technologyFormEvents() {
        this.technologyForm.on('error', () => alert('Erro ao cadastrar tecnologia'));
        this.technologyForm.on('submit', () => {
            this.menu.render('technologies');
            this.technologies.render();
        });
    }

    userEvents() {
        this.user.on('error', () => alert('Erro carregar usuário'));
        this.user.on('remove-error', () => alert('Erro ao excluir conta'));
        this.user.on('remove-account', () => {
            alert('Que pena! Sua conta foi excluída.');
            localStorage.clear();
            this.menu.clear();
            this.signin.render();
        });
    }

    menuEvents() {
        this.menu.on('click', (path) => {
            this.menu.render(path);
            this[path].render();
        });
        this.menu.on('logout', () => {
            localStorage.clear();
            this.menu.clear();
            this.signin.render();
        })
    }

}

module.exports = App;