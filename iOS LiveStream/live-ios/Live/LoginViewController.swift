//
//  LoginViewController.swift
//  Live
//
//  Created by 尔特 夏 on 12/21/16.
//  Copyright © 2016 io.ltebean. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController {

    @IBOutlet weak var userEmailTextField: UITextField!
    @IBOutlet weak var userPasswordTextField: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func loginButtonTapped(_ sender: Any) {
        
        let userEmail = userEmailTextField.text;
        let userPassword = userPasswordTextField.text;

        let myurl = URL(string: "\(Config.serverUrl)/login")
        var request = URLRequest(url: myurl!)
        request.httpMethod = "POST"
        let postString = "email=\(userEmail)&password=\(userPassword)"
        
        request.httpBody = postString.data(using: String.Encoding.utf8)
        
        
       NSURLConnection.sendAsynchronousRequest(request, queue: OperationQueue.main, completionHandler: { response, data, error in
        guard error == nil else {
            print(error)
            return
        }
        
        
        let json = JSON(data: data!)
        
        var isUserLogined = false
        
        if json["status"].stringValue == "succ"{
            isUserLogined = true
            User.currentUser.sessionid =  json["data"]["_id"].stringValue
            User.currentUser.email = json["data"]["email"].stringValue
            User.currentUser.nickname = json["data"]["nickname"].stringValue
            
        }
        
        if(isUserLogined == true){
            
            DispatchQueue.main.async {
                //self.displayMaAlertMessage(userMessage: messageToDisplay)
                self.performSegue(withIdentifier: "NavigationControllerView", sender: self)
            }
            
        }

        
        })
        
        
        
//        let userEmailStored = UserDefaults.standard.string(forKey:"userEmail");
//        let userPasswordStord = UserDefaults.standard.string(forKey:"userPassword");
//        
//        if(userEmail == userEmailStored){
//            if(userPassword == userPasswordStord){
//                //login is successfull
//                UserDefaults.standard.set(true,forKey:"isUserLoggedIn");
//                UserDefaults.standard.synchronize();
//                self.dismiss(animated: true, completion: nil);
//            }
//        }
        
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
