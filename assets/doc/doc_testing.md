# Testing

## **HTML**  

Some errors were found, please the read explanation. (*[link to Nu Html Checker](https://validator.w3.org/nu/)*)

| page                                               | link to the test                                             | result                                                       |
| -------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| home                                               | [link to the test](https://validator.w3.org/nu/?doc=https%3A%2F%2Fsalt-and-pepper-manager.herokuapp.com%2F) | No errors or warnings to show.                               |
| menu                                               | [link to the test](https://validator.w3.org/nu/?doc=https%3A%2F%2Fsalt-and-pepper-manager.herokuapp.com%2Fmenu%2F) | No errors or warnings to show.                               |
| login                                              | [link to the test](https://validator.w3.org/nu/?doc=https%3A%2F%2Fsalt-and-pepper-manager.herokuapp.com%2Faccounts%2Flogin%2F) | No errors or warnings to show.                               |
| signup                                             | [link to the test](https://validator.w3.org/nu/?doc=https%3A%2F%2Fsalt-and-pepper-manager.herokuapp.com%2Faccounts%2Fsignup%2F) | **Error :** **Element [`ul`](https://html.spec.whatwg.org/multipage/#the-ul-element) not allowed as child of element [`small`](https://html.spec.whatwg.org/multipage/#the-small-element) in this context. (Suppressing further errors from this subtree.)**  <br />**Explanation :** The error is part of "Crispy" form, which is internal and I can not change from the outside. |
| change_password                                    | [link to the test](https://validator.w3.org/nu/?doc=https%3A%2F%2Fsalt-and-pepper-manager.herokuapp.com%2Faccounts%2Fpassword_change%2F) | No errors or warnings to show.                               |
| user_settings<br />(*Change Your Profile Picture*) | [link to the test](https://validator.w3.org/nu/?doc=https%3A%2F%2Fsalt-and-pepper-manager.herokuapp.com%2Faccounts%2F) | No errors or warnings to show.                               |
| comments<br />(*Write A Review*)                   | html copied into validator                                   | **Error 1 :** can not validate inherited HTML from base html<br />**Error 2 :** dose not recognize Django template tag with date time<br />**Error 3 :** Duplicate ID, but only one of the ids is used at a time, depending on the screen with |
| bookings                                           | html copied into validator                                   | **Error 1 :** can not validate inherited HTML from base html<br />**Error 2 :** dose not recognize Django template tag with date time<br /> |





## CSS  

W3C Internationalization Checker [validator.w3.org/](https://validator.w3.org/)

| page                          | link to the test                                             | result                |
| ----------------------------- | ------------------------------------------------------------ | --------------------- |
| home                          | [link to the test](https://validator.w3.org/i18n-checker/check?uri=https%3A%2F%2Fsalt-and-pepper-manager.herokuapp.com%2F#validate-by-uri+) | No issues to report ! |
| menu                          | [link to the test](https://validator.w3.org/i18n-checker/check?uri=https%3A%2F%2Fsalt-and-pepper-manager.herokuapp.com%2Fmenu%2F#validate-by-uri+) | No issues to report ! |
| login                         | [link to the test](https://validator.w3.org/i18n-checker/check?uri=https%3A%2F%2Fsalt-and-pepper-manager.herokuapp.com%2Faccounts%2Flogin%2F#validate-by-uri+) | No issues to report ! |
| signup                        | [link to the test](https://validator.w3.org/i18n-checker/check?uri=https%3A%2F%2Fsalt-and-pepper-manager.herokuapp.com%2Faccounts%2Fsignup%2F#validate-by-uri+) | No issues to report ! |
| password_change               | [link to the test](https://validator.w3.org/i18n-checker/check?uri=https%3A%2F%2Fsalt-and-pepper-manager.herokuapp.com%2Faccounts%2Fpassword_change%2F#validate-by-uri+) | No issues to report ! |
| comments,  bookings, accounts | can not be tested because the validator can not log in to reach the site | -----                 |

