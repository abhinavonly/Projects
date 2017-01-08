//
//  ViewController.swift
//  Live
//
//  Created by 尔特 夏 on 12/20/16.
//  Copyright © 2016 io.ltebean. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewDidAppear(_ animated: Bool) {
          let isUserLoggedIn = UserDefaults.standard.bool(forKey:"isUserLoggedIn");
          if(!isUserLoggedIn){
          self.performSegue(withIdentifier: "loginView", sender: self);
          }

    }

    @IBAction func logoutButtonTapped(_ sender: Any) {
        UserDefaults.standard.set(false,forKey:"isUserLoggedIn");
        UserDefaults.standard.synchronize();
        self.performSegue(withIdentifier: "loginView", sender: self);

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
