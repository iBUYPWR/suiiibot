import requests  
import json  
import cfscrape
import os
import psycopg2
import time
import sys
import bs4 as bs
#DATABASE_URL = os.environ['DATABASE_URL']
DATABASE_URL="postgres://dqmxzhafqocrvc:91188ffe48ccdb444864efa9a871cd7b923cbe8f4cb977f77b288ae82d9fc888@ec2-34-224-226-38.compute-1.amazonaws.com:5432/dd00ofl3foa6c0"
conn = psycopg2.connect(DATABASE_URL)
i=0
while True:
    try:
        cur = conn.cursor()
        scraper = cfscrape.create_scraper()
        indexsrc=bs.BeautifulSoup(str(scraper.get("https://www.futbin.com/market").content),'html.parser')
        indx=indexsrc.find_all('div',attrs={'class' : 'market_index_th'})[0].text.split('\\r\\n')[1].replace(" ","")
        indxgrth=indexsrc.find_all('div',attrs={'class' : 'market_index_th'})[0].text.split('\\r\\n')[2].replace(" ","").replace("%","")
        if len(indexsrc.find_all('i',attrs={'class' : 'fa-caret-up'})) > 0:
            updir='true'
        elif len(indexsrc.find_all('i',attrs={'class' : 'fa-caret-down'})) > 0:
            updir='false'
        cur.execute("UPDATE index100 SET upt="+indx+",grth="+indxgrth+",dir="+updir+" WHERE 1=1;")
        try:
            cur.execute("SELECT * from general;")
            table=cur.fetchall()
            print(table)
        except:
            print ("I can't SELECT from general")
        for x in table:
            result=json.loads(scraper.get("https://www.futbin.com/22/playerPrices?player="+str(x[1])).content)
            lprice=result[str(x[1])]['prices']['ps']['LCPrice']
            if type(lprice) != int:
                lprice=lprice.replace(',','')
            #cur.execute("INSERT INTO test (txt,player) VALUES ("+str(lprice)+",'"+str(x[2])+"');")
            cur.execute("UPDATE general SET CurrentPrice="+str(lprice)+" WHERE PlayerID="+str(x[1])+";")
            print(cur.rowcount)
            #print("UPDATE general SET CurrentPrice="+str(lp rice)+" WHERE PlayerID="+str(x[1])+";")
            if x[5] == "high":
                if int(lprice) >= int(x[3]):
                    print("done")
                    for f in range(3):
                        requests.get("https://api.telegram.org/bot883911956:AAH2JTe8DaGS7Picn_EaPtC4QTxSP6A46UI/sendMessage?text=Suiiiiii! "+str(x[2])+" has reached higher than "+str(x[3])+"!\n Alert No."+str(f)+"&chat_id=96752927")
                        requests.get("https://api.telegram.org/bot883911956:AAH2JTe8DaGS7Picn_EaPtC4QTxSP6A46UI/sendMessage?text=Suiiiiii! "+str(x[2])+" has reached higher than "+str(x[3])+"!\n Alert No."+str(f)+"&chat_id=99850101")
                    cur.execute("DELETE FROM general WHERE RecordID="+str(x[0])+";")
            elif x[5] == "low":
                if int(lprice) <= int(x[3]):
                    print("done")
                    for f in range(3):
                        requests.get("https://api.telegram.org/bot883911956:AAH2JTe8DaGS7Picn_EaPtC4QTxSP6A46UI/sendMessage?text=Suiiiiii! "+str(x[2])+" has reached lower than "+str(x[3])+"!\n Alert No."+str(f)+"&chat_id=96752927")
                        requests.get("https://api.telegram.org/bot883911956:AAH2JTe8DaGS7Picn_EaPtC4QTxSP6A46UI/sendMessage?text=Suiiiiii! "+str(x[2])+" has reached lower than "+str(x[3])+"!\n Alert No."+str(f)+"&chat_id=99850101")
                    cur.execute("DELETE FROM general WHERE RecordID="+str(x[0])+";")
            conn.commit()
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        print(result)
        print(str(e))
        print(x)
    time.sleep(150)
    i+=1;
    if i == 1:
        requests.get("https://suiiibot.herokuapp.com/")
        i=0
