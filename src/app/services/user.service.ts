import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
}

class User {
  declare userid1: number;
  declare userid2: number;
  username: string;
  password: string;
  username2: string;
  password2: string;
  constructor(userid1: number, userid2: number, username: string, password: string, username2: string, password2: string) {
    this.username = username;
    this.password = password;
    this.username2 = username2;
    this.password2 = password2;
  }
}

let arr: User[] = new Array();
arr.push({
  userid1: 1,
  userid2: 1,
  username: "frontend",
  password: "frontend dev",
  username2: "frontend 2",
  password2: "frontend dev 2"
});
arr.push(new User(1, 2, "frontend", "frontend dev", "frontend 2", "frontend dev 2"));

type Props = RouteComponentProps<RouterProps>;

type State = {
  username: string,
  password: string,
  loading: boolean,
  message: string
};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

handleLogin(formValue: { username: string; password: string }) {
  const { username, password } = formValue;

  this.setState({
    message: "",
    loading: true
  });


  Login(username, password).then(
    () => {
      this.props.history.push("/profile");
      window.location.reload();
    },
    error => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.setState({
        loading: false,
        message: resMessage
      });
    }
  );
}

  type State = {
    username: string,
    password: string,
    successful: boolean,
    message: string
  };

  export default class Register extends Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.handleRegister = this.handleRegister.bind(this);

      this.state = {
        username: "",
        password: "",
        successful: false,
        message: ""
      };
    }

    handleRegister(formValue: { username: string; password: string }) {
      const { username, password } = formValue;

      this.setState({
        message: "",
        successful: false
      });

      register(
        username,
        password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }

sessionStorage.setItem('key', 'value');
