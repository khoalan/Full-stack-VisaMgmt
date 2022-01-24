export class Constant {
  //request login url to back-end
  public static REQUEST_LOGIN_URL: string = 'http://localhost:8080/login';
  //get token url from back-end
  public static GENERATE_TOKEN_URL: string =
    'http://localhost:8080/registertoken';

  public static REQUEST_REGISTER_URL: string = 'http://localhost:8080/register';

  public static EMPLOYEE_HOME_URL: string =
    'http://localhost:8081/employee/person';

  public static VALIDATE_TOKEN: string = 'http://localhost:8080/token';

  public static REQUEST_WORK_AUTH_URL: string = ' ';

  public static GET_EMPLOYEE_URL = 'http://localhost:8081/hr/employee';
  public static GET_ENP_URL = 'http://localhost:8081/hr/hire/user';
}
