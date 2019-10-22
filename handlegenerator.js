let jwt = require("jsonwebtoken");
let config = require("./config");
var User = require("./routes/schema");

// Clase encargada de la creación del token
class HandlerGenerator {
  login(req, res) {
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;

    // Este usuario y contraseña, en un ambiente real, deben ser traidos de la BD
    // let mockedUsername = "admin";
    // let mockedPassword = "password";

    // Si se especifico un usuario y contraseña, proceda con la validación
    // de lo contrario, un mensaje de error es retornado
    if (username && password) {
      // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
      // de lo contrario, un mensaje de error es retornado
      //if (username === mockedUsername && password === mockedPassword)

      User.findOne({ username: req.body.username }, function(err, user) {
        if (user.validPassword(req.body.password)) {
          // password matched. proceed forward
          // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
          let token = jwt.sign({ username: username }, config.secret, {
            expiresIn: "24h"
          });

          // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
          res.json({
            success: true,
            message: "Authentication successful!",
            token: token
          });
        } else {
          //password did not match
          res.send(403).json({
            success: false,
            message: "Incorrect username or password"
          });
        }
      });
    }
  }

  index(req, res) {
    // Retorna una respuesta exitosa con previa validación del token
    res.json({
      success: true,
      message: "Index page"
    });
  }

  //Guarda al usuario
  register(req, res) {
    var new_user = new User({
      username: req.body.username
    });
    new_user.password = new_user.generateHash(req.body.password);
    new_user.save();
    res.send("User saved successfully")
  }
}

module.exports = HandlerGenerator;
