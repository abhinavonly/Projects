#Final Project Section-A
# Chinna rayudu samineni(cwid-10408968)
#Abhinav singh(cwid-10410326)

rm(list=ls())
bankdata<-read.csv("banktraining.csv")

View(bankdata)

df<-data.frame(young=bankdata$young,mid=bankdata$mid,old=bankdata$old,vold=bankdata$vold,
               admin=bankdata$admin, bluecollar=bankdata$bluecollar,entrepreneur=bankdata$entrepreneur, 
               housemaid=bankdata$housemaid,management=bankdata$management,retired=bankdata$retired, 
               selfemployed=bankdata$selfemployed,student=bankdata$student,services=bankdata$services,
               technician=bankdata$technician,unemployed=bankdata$unemployed,   
               married=bankdata$married,single=bankdata$single,divorced=bankdata$divorced,
               primary=bankdata$primary,secondary=bankdata$secondary,tertiary=bankdata$tertiary,
               default=bankdata$default,housing=bankdata$housing,loan=bankdata$loan,  
               contact=bankdata$contact,
               campaign4=bankdata$campaign4,campaign8=bankdata$campaign8,campaign12=bankdata$campaign12,
               campaign16=bankdata$campaign16,
               po1failure=bankdata$po1failure,po2other=bankdata$po2other, po3success=bankdata$po3success,
               y=bankdata$y)
View(df)

#creating index  
idx=seq(from=1,to=nrow(df),by=5)

#Dividing into Training and Test data
newtest<-df[idx,]    # Create test dataset
newtest1<-df[idx,-33] # # Create test dataset withour car_cancellation column
newtraining<-df[-idx,]    # Create training dataset
#View(newtraining)
#View(newtest)
#View(newtest1)


######## Using KNN
library(class)


newpredict<-knn(newtraining[,-33], newtest[,-33],newtraining[,33],k=1)
newresults<-cbind(newtest,as.character(newpredict))  # adds new column from the result
table(newresults[,33],newresults[,34])
df<-as.data.frame(table(newresults[,33],newresults[,34]))
good_predictions<-sum(df$Freq[df$Var1==df$Var2])
total_predictions<- sum(df$Freq)
successrate_K_1 <- (good_predictions/total_predictions) * 100
successrate_K_1




newpredict<-knn(newtraining[,-33], newtest[,-33],newtraining[,33],k=3)
newresults<-cbind(newtest,as.character(newpredict))  # adds new column from the result
table(newresults[,33],newresults[,34])
df<-as.data.frame(table(newresults[,33],newresults[,34]))
good_predictions<-sum(df$Freq[df$Var1==df$Var2])
total_predictions<- sum(df$Freq)
successrate_K_3 <- (good_predictions/total_predictions) * 100
successrate_K_3





newpredict<-knn(newtraining[,-33], newtest[,-33],newtraining[,33],k=5)
newresults<-cbind(newtest,as.character(newpredict))  # adds new column from the result
table(newresults[,33],newresults[,34])
df<-as.data.frame(table(newresults[,33],newresults[,34]))
good_predictions<-sum(df$Freq[df$Var1==df$Var2])
total_predictions<- sum(df$Freq)
successrate_K_5 <- (good_predictions/total_predictions) * 100
successrate_K_5





newpredict<-knn(newtraining[,-33], newtest[,-33],newtraining[,33],k=7)
newresults<-cbind(newtest,as.character(newpredict))  # adds new column from the result
table(newresults[,33],newresults[,34])
df<-as.data.frame(table(newresults[,33],newresults[,34]))
good_predictions<-sum(df$Freq[df$Var1==df$Var2])
total_predictions<- sum(df$Freq)
successrate_K_7 <- (good_predictions/total_predictions) * 100
successrate_K_7



newpredict<-knn(newtraining[,-33], newtest[,-33],newtraining[,33],k=9)
newresults<-cbind(newtest,as.character(newpredict))  # adds new column from the result
table(newresults[,33],newresults[,34])
df<-as.data.frame(table(newresults[,33],newresults[,34]))
good_predictions<-sum(df$Freq[df$Var1==df$Var2])
total_predictions<- sum(df$Freq)
successrate_K_9 <- (good_predictions/total_predictions) * 100
successrate_K_9


newpredict<-knn(newtraining[,-33], newtest[,-33],newtraining[,33],k=11)
newresults<-cbind(newtest,as.character(newpredict))  # adds new column from the result
table(newresults[,33],newresults[,34])
df<-as.data.frame(table(newresults[,33],newresults[,34]))
good_predictions<-sum(df$Freq[df$Var1==df$Var2])
total_predictions<- sum(df$Freq)
successrate_K_11 <- (good_predictions/total_predictions) * 100
successrate_K_11









############# KKNN


?kknn() 
library(class)
library(kknn)

newpredict <- kknn(y~., newtraining, newtest, distance=1,k=1)
#summary(newpredict)
fit <- fitted(newpredict)

s<-table(newtest$y, fit) # table gives the result in tabular form
View(s)

df1<-as.data.frame(s)
good_predictions<-sum(df$Freq[df$Var1==df$Var2])
total_predictions<- sum(df$Freq)
successrate_KKNN_1 <- (good_predictions/total_predictions) * 100
successrate_KKNN_1







newpredict <- kknn(y~., newtraining, newtest, distance=1,k=3)
#summary(newpredict)
fit <- fitted(newpredict)

s<-table(newtest$y, fit) # table gives the result in tabular form
View(s)

df1<-as.data.frame(s)
good_predictions<-sum(df$Freq[df$Var1==df$Var2])
total_predictions<- sum(df$Freq)
successrate_KKNN_3 <- (good_predictions/total_predictions) * 100
successrate_KKNN_3



newpredict <- kknn(y~., newtraining, newtest, distance=1,k=5)
#summary(newpredict)
fit <- fitted(newpredict)

s<-table(newtest$y, fit) # table gives the result in tabular form
View(s)

df1<-as.data.frame(s)
good_predictions<-sum(df$Freq[df$Var1==df$Var2])
total_predictions<- sum(df$Freq)
successrate_KKNN_5 <- (good_predictions/total_predictions) * 100
successrate_KKNN_5


newpredict <- kknn(y~., newtraining, newtest, distance=1,k=7)
#summary(newpredict)
fit <- fitted(newpredict)

s<-table(newtest$y, fit) # table gives the result in tabular form
View(s)

df1<-as.data.frame(s)
good_predictions<-sum(df$Freq[df$Var1==df$Var2])
total_predictions<- sum(df$Freq)
successrate_KKNN_7 <- (good_predictions/total_predictions) * 100
successrate_KKNN_7







#########CART###################
set.seed(9850)
g<-runif(nrow(df))
df_new<-bankdata[order(g),]
df_new$y<-as.factor(df_new$y)
str(df_new)

install.packages("C50")
library(C50)
#m1<-C5.0(df_new[5000,-45],df_new[5000,45],)
m1<-C5.0(df_new[1:5000,-45],df_new[1:5000,45])
#m1<-C5.0(df_new[,-45],df_new$y)
m1
p1<-predict(m1,df_new[5001:7842,])
p1
table(df_new[5001:7842,45],predicted= p1)
??C5.0
plot(p1)
plot(m1)
#in the table you can see the correct predictions were 2047 and 407 
#and the errors are 121 and 267
#2047 and 407 correct predictions is a good number


set.seed(123)
#CART decision tree
library(rpart)
?rpart

fit <- rpart(as.factor(y)~., data=newtraining[1:5000,],
             control=rpart.control(maxdepth = 10))
printcp(fit)

# Plot the fit
plot(fit, uniform=TRUE,margin=0.2)
text(fit,pretty=1 )

#Predict on the test dataset
results <- predict(fit, type="class", newdata=newtest)
results

#Confusion matrix
table(results,newtest$y)





