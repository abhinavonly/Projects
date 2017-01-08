//
//  RegisterPageViewController.swift
//  Live
//
//  Created by 尔特 夏 on 12/20/16.
//  Copyright © 2016 io.ltebean. All rights reserved.
//

import UIKit

class RegisterPageViewController: UIViewController {

   
    @IBOutlet weak var userNicknameTextField: UITextField!
    @IBOutlet weak var userEmailTextField: UITextField!
    @IBOutlet weak var userPasswordTextField: UITextField!
    @IBOutlet weak var repeatPasswordTextField: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    @IBAction func registerButtonTapped(_ sender: Any) {
        let userPassword = userPasswordTextField.text;
        let userEmail = userEmailTextField.text;
        let userRepeatedPassword = repeatPasswordTextField.text;
        let userNickname = userNicknameTextField.text;
        
        //Check for empty fields
        if((userEmail?.isEmpty)! || (userPassword?.isEmpty)! || (userRepeatedPassword?.isEmpty)!) || (userNickname?.isEmpty)!{
            //Display alert message
            
            displayMaAlertMessage(userMessage: "All fields are required");
            
            return;        
        }
        
        // Check if password match
        if(userPassword != userRepeatedPassword)
        {
            //Display an alert message
            displayMaAlertMessage(userMessage: "Passwords do not match");
        }
        let myurl = URL(string: "\(Config.serverUrl)/register")
        var request = URLRequest(url: myurl!)
        request.httpMethod = "POST"
        let postString = "email=\(userEmail)&nickname=\(userNickname)&password=\(userPassword)"
        
        request.httpBody = postString.data(using: String.Encoding.utf8)
        
        let task = URLSession.shared.dataTask(with: request){
            (data, response, error) in
            guard error == nil else {
                print(error)
                return
            }
            guard let data = data else {
                print("Data is empty")
                return
            }
            
            
            //   print( String(data: data, encoding: String.Encoding.utf8))
    
            let json = try! JSONSerialization.jsonObject(with: data, options: [JSONSerialization.ReadingOptions.allowFragments])
            
            var myjson = json as? [String: Any]
            
            var isUserRegistered = false
            
            if let parseJSON = myjson {
                var resultStatus = parseJSON["status"] as! String
                print("resultStatus: \(resultStatus) \n")
                if resultStatus == "succ"{
                    isUserRegistered = true
                }
                
                var messageToDisplay:String =  parseJSON["msg"] as! String
                
//                DispatchQueue.main.async {
//                     self.displayMaAlertMessage(userMessage: messageToDisplay)
//                }
            }
        
            if(isUserRegistered == true){
                
                DispatchQueue.main.async {
                    self.performSegue(withIdentifier: "registerView", sender: self)

//                    self.displayMaAlertMessage(userMessage: messageToDisplay)
                }
//                    self.performSegue(withIdentifier: "registerView", sender: self)
                
            }

        }
        task.resume()
    
    
        
//        // Store data
//        UserDefaults.standard.set(userEmail,forKey:"userEmail");
//        
//        UserDefaults.standard.set(userPassword,forKey:"userPassword");
//        
//        UserDefaults.standard.set(userNickname,forKey:"userNickname");
//        
//        UserDefaults.standard.synchronize();
//        
//        
//        // Dispaly alert message with confirmation
//        displayMaAlertMessage(userMessage: "Registration is successful.Thank you!")
    }
  
    @IBAction func TEST(_ sender: Any) {
        self.view.endEditing(true);
    }
   
    
    func displayMaAlertMessage(userMessage:String){
        let myAlert = UIAlertController(title:"Alert",message:userMessage,preferredStyle:UIAlertControllerStyle.alert);
        
        let okAction = UIAlertAction(title:"OK",style:UIAlertActionStyle.default,handler:nil)
        
        myAlert.addAction(okAction);
        
        self.present(myAlert,animated:true,completion:nil);
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
