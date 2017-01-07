title " All Wine - Exploratory Analysis";

proc univariate data = All plot normal;
	
	var fixed_acidity volatile_acidity citric_acid residual_sugar chlorides free_sulfur_dioxide total_sulfur_dioxide density pH sulphates alcohol quality;
run;


title " Red Wine - Exploratory Analysis";

proc univariate data = Red plot normal;
	
	var fixed_acidity volatile_acidity citric_acid residual_sugar chlorides free_sulfur_dioxide total_sulfur_dioxide density pH sulphates alcohol quality;
run;

title " White Wine - Exploratory Analysis";

proc univariate data = White plot normal;
	
	var fixed_acidity volatile_acidity citric_acid residual_sugar chlorides free_sulfur_dioxide total_sulfur_dioxide density pH sulphates alcohol quality;
run;

proc standard data= All
				MEAN= 0 STD=1
				OUT= All_z;
			VAR fixed_acidity volatile_acidity citric_acid residual_sugar chlorides free_sulfur_dioxide total_sulfur_dioxide density pH sulphates alcohol quality;
run;

title "principal component analysis for All_z dataset";
proc princomp data= All_z;
	var fixed_acidity volatile_acidity citric_acid residual_sugar chlorides free_sulfur_dioxide total_sulfur_dioxide density pH sulphates alcohol quality;
run;


title "regression on the quality variable - all variables";
proc reg data = All;
	model quality = fixed_acidity volatile_acidity citric_acid residual_sugar chlorides free_sulfur_dioxide total_sulfur_dioxide density pH sulphates alcohol;
run;
	


title "regression on the quality variable - alcohol volatile_acidity residual_sugar free_sulfur_dioxide sulphates pH: ALL dataset";
proc reg data = All;
	model quality = alcohol volatile_acidity residual_sugar free_sulfur_dioxide sulphates pH;
run;
	

title "regression on the quality variable - alcohol volatile_acidity residual_sugar free_sulfur_dioxide sulphates pH: ALL dataset";
proc reg data = All;
	model quality = alcohol volatile_acidity residual_sugar free_sulfur_dioxide sulphates pH;
run;
	
title "principal component analysis for white dataset";
proc princomp data= white;
	var fixed_acidity volatile_acidity citric_acid residual_sugar chlorides free_sulfur_dioxide total_sulfur_dioxide density pH sulphates alcohol quality;
run;


title "regression on the quality variable - alcohol volatile_acidity residual_sugar free_sulfur_dioxide sulphates pH: white dataset";
proc reg data = white;
	model quality = alcohol volatile_acidity residual_sugar free_sulfur_dioxide sulphates pH;
run;

title "principal component analysis for red dataset";
proc princomp data= red;
	var fixed_acidity volatile_acidity citric_acid residual_sugar chlorides free_sulfur_dioxide total_sulfur_dioxide density pH sulphates alcohol quality;
run;


title "regression on the quality variable - alcohol volatile_acidity sulphates pH: red dataset";
proc reg data = red;
	model quality = alcohol volatile_acidity sulphates pH;
run;

title "factor analysis for all dataset with 5 factors";	
proc factor data= all_z print method = principal nfactors=5
			score scree residuals EIGENVECTORS PLOT
			MINEIGEN= 0  ROTATE=PROCMAX outstat=fact out= factout;
var fixed_acidity volatile_acidity citric_acid residual_sugar chlorides free_sulfur_dioxide total_sulfur_dioxide density pH sulphates alcohol quality;
run;


title "Quality distribution: all dataset";
proc univariate data=all noprint; 
	histogram quality;
	
run; 

data All_quality;
	set All;
		if quality >6 then quality_categoric = 1;
			else quality_categoric = 0;


data white_quality;
	set white;
		if quality >6 then quality_categoric = 1;
			else quality_categoric = 0;

data red_quality;
	set red;
		if quality >6 then quality_categoric = 1;
			else quality_categoric = 0;



title "principal component analysis for all_quality dataset";
proc princomp data= all_quality;
	var fixed_acidity volatile_acidity citric_acid residual_sugar chlorides free_sulfur_dioxide total_sulfur_dioxide density pH sulphates alcohol quality_categoric;
run;


data temp;
set all_quality;
n=ranuni(8);

proc sort data=temp;
  by n;
  data training_all testing_all;
   set temp nobs=nobs;
   if _n_<=.7*nobs then output training_all;
    else output testing_all;
   run;




data temp_white;
set white_quality;
n=ranuni(8);

proc sort data=temp_white;
  by n;
  data training_white testing_white;
   set temp_white nobs=nobs;
   if _n_<=.7*nobs then output training_white;
    else output testing_white;
   run;



data temp_red;
set red_quality;
n=ranuni(8);

proc sort data=temp_red;
  by n;
  data training_red testing_red;
   set temp_red nobs=nobs;
   if _n_<=.7*nobs then output training_red;
    else output testing_red;
   run;


title "regression on the quality_categoric variable - alcohol volatile_acidity sulphates: red dataset";
proc reg data = training_red;
	model quality_categoric = volatile_acidity sulphates alcohol;
run;




title "regression on the quality variable - alcohol volatile_acidity residual_sugar free_sulfur_dioxide sulphates pH: white dataset";
proc reg data = training_white;
	model quality_categoric = alcohol volatile_acidity residual_sugar free_sulfur_dioxide sulphates pH;
run;


title "regression on the quality_categoric variable - alcohol volatile_acidity residual_sugar sulphates: training_All dataset";
proc reg data = training_all;
	model quality_categoric = alcohol volatile_acidity residual_sugar sulphates;
run;


title "logistic regression and validation for all";

proc logistic data= all_quality descending;
	model quality_categoric = alcohol volatile_acidity residual_sugar sulphates/link=glogit;
	output out = preds predprobs=individual;
	run;

proc freq data= preds;
	table quality_categoric*_INTO_ /out= CellCounts;
	run;

data CellCounts;
        set CellCounts;
        Match=0;
        if quality_categoric=_INTO_ then Match=1;
        run;
proc means data=CellCounts mean;
        freq count;
        var Match;
        run;



title "logistic regression and validation for white";

proc logistic data= white_quality descending;
	model quality_categoric = alcohol volatile_acidity residual_sugar free_sulfur_dioxide sulphates pH/link=glogit;
	output out = preds_white predprobs=individual;
	run;

proc freq data= preds_white;
	table quality_categoric*_INTO_ /out= CellCounts_white;
	run;

data CellCounts_white;
        set CellCounts_white;
        Match=0;
        if quality_categoric=_INTO_ then Match=1;
        run;
proc means data=CellCounts_white mean;
		freq count;
		var Match;
        run;


title "logistic regression and validation for red";

proc logistic data= red_quality descending;
	model quality_categoric = volatile_acidity sulphates alcohol/link=glogit;
	output out = preds_red predprobs=individual;
	run;

proc freq data= preds_red;
	table quality_categoric*_INTO_ /out= CellCounts_red;
	run;

data CellCounts_red;
        set CellCounts_red;
        Match=0;
        if quality_categoric=_INTO_ then Match=1;
        run;
proc means data=CellCounts_red mean;
		freq count;
		var Match;
        run;

































proc logistic data= training_red descending;
	model quality_categoric = volatile_acidity sulphates alcohol;
	run;

proc logistic data= training_white descending;
	model quality_categoric = alcohol volatile_acidity residual_sugar free_sulfur_dioxide sulphates pH;
	run;


