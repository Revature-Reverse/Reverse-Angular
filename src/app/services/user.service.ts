import { Injectable } from '@angular/core';

import {FormGroup} from "@angular/forms";
import {User} from "../user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (private httpClient: HttpClient){
  }

  public userRegistration(user: User){
    //user-registration must match in back-end
        return this.httpClient.post<User>("localhost:8080/user-registration", user);
  }
  //user-login must match in back-end
  public userLogin(user: User){
    return this.httpClient.post<User>("localhost:8080/user-login", user);
  }


  //user-login must match in back-end
  public resetPassword(user: User){
    return this.httpClient.post<User>("localhost:8080/reset-password", user);
  }
}
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
