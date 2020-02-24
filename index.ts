import * as express from "express";
import * as bodyParser from "body-parser";
import * as mysql from "mysql";

let app = express();

var db_hostname = process.env.GAMBIT_DB_HOSTNAME ? process.env.GAMBIT_DB_HOSTNAME : "localhost";
var db_username = process.env.GAMBIT_DB_UNAME ? process.env.GAMBIT_DB_UNAME : "root";
var db_password = process.env.GAMBIT_DB_PWD ? process.env.GAMBIT_DB_PWD : "my-secret-pw";
var db_database = process.env.GAMBIT_DB_DATABASE ? process.env.GAMBIT_DB_DATABASE : "gambits_db";

/*
CREATE TABLE `gambits_db`.`gambits` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL,
  `experiment` TINYINT NULL,
  `school` VARCHAR(200) NULL,
  `level` VARCHAR(200) NULL,
  `range` VARCHAR(200) NULL,
  `target` VARCHAR(200) NULL,
  `pull_time` VARCHAR(200) NULL,
  `components` VARCHAR(200) NULL,
  `duration` VARCHAR(200) NULL,
  `scale` VARCHAR(200) NULL,
  `description` VARCHAR(450) NULL,
  PRIMARY KEY (`id`));
*/

let mysqlConnection = mysql.createConnection({
  host     : db_hostname,
  user     : db_username,
  password : db_password,
  database : db_database
})

//TODO: Create the mysql db schema

let rootUrl = "/hyper";

app.use(rootUrl + "/gambit/add", express.static("html/add"));
app.use(rootUrl + "/gambits/list", express.static("html/list"));
app.use(rootUrl + "/js", express.static("build"));


app.post(rootUrl + "/gambit/add", bodyParser.urlencoded({extended: true}),
  (req, res) => {
    console.log("wee", req.body);
    let name = req.body.name;
    let experiment = req.body.experiment ? true : false;
    let school = req.body.school;
    let level = req.body.level;
    let range = req.body.range;
    let target = req.body.target;
    let pullTime = req.body.pull_time;
    let components = req.body.components;
    let duration = req.body.duration;
    let scale = req.body.scale;
    let description = req.body.description;

    let query = "INSERT "
      + "INTO gambits "  
        + "(`name`, `experiment`, `school`, `level`, `range`, `target`, `pull_time`, `components`, `duration`, `scale`, description) " 
        + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
    let queryParams = [
      name,
      experiment,
      school,
      level,
      range,
      target,
      pullTime,
      components,
      duration,
      scale,
      description 
    ]

    mysqlConnection.query(query, queryParams, 
      (err, result) => {
        if(!err) {
          // res.send("hooray");
          res.redirect(rootUrl + "/gambit/add");
        } else {
          //TODO
          res.send({msg: "oops", error: err});
        }
      }
    )

    // res.redirect("/gambit/add");

    
  }
);

app.get(rootUrl + "/gambits/all", 
  (req, res) => {
    let query = "SELECT * FROM gambits;"

    mysqlConnection.query(query, 
      (err,results,fields) => {
        if(!err) {
          //TODO: Process the gambits to be the right format
          console.log(results);
          res.send(results);
        } else {
          res.send({error: "oops, something went wrong", msg: err});
        }
      }
    );
  }
);

app.listen(3039, function () {
    console.log('Example app listening on port 3039!');
});

class GambitModel {
  constructor (
    name: string,
    experiment: boolean,
    school: string,
    level: string,
    range: string,
    target: string,
    pull_time: string,
    components: string,
    duration: string,
    scale: string,
    description: string
  ) {}
}