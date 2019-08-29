import json
import firebase_admin
import pandas as pd
from firebase_admin import credentials
from firebase_admin import firestore

import utils
import xlwt 
from xlwt import Workbook

import csv

cred = credentials.Certificate('./serviceAccount.json')
firebase_admin.initialize_app(cred)
firestore = firestore.client()


wb = Workbook() 
sheet1 = wb.add_sheet('Sheet 1')
sheet1.write(0, 0, 'ลำดับ')
sheet1.write(0, 1, 'ปี')
sheet1.write(0, 2, 'ชื่อ-นามสกุล') 
sheet1.write(0, 3, 'ชื่อเล่น')
sheet1.write(0, 4, 'สาขา')
sheet1.write(0, 5, 'รหัสนักศึกษา')

sheet1.write(0, 6, 'สเเกนรวม')
sheet1.write(0, 7, 'ปี1')
sheet1.write(0, 8, 'ปี2')
sheet1.write(0, 9, 'ปี3')
sheet1.write(0, 10, 'ปี4')
  
docs = firestore.collection('users').stream()
count, row = 0, 1

for doc in docs:
    doc = doc.to_dict()
    if doc.get('year') == "1":
        print(count+1 ,json.dumps(doc['nickname'], ensure_ascii=False).strip('"'))
        sheet1.write(row, 0, count+1)
        sheet1.write(row, 1, json.dumps(doc['year'], ensure_ascii=False).strip('"'))
        sheet1.write(row, 2, json.dumps(doc['name'], ensure_ascii=False).strip('"')) 
        sheet1.write(row, 3, json.dumps(doc['nickname'], ensure_ascii=False).strip('"'))
        sheet1.write(row, 4, json.dumps(doc['branch'], ensure_ascii=False).strip('"'))
        sheet1.write(row, 5, json.dumps(doc['id'], ensure_ascii=False).strip('"'))
        sheet1.write(row, 6, json.dumps(doc['amountOf']['sum'], ensure_ascii=False))
        sheet1.write(row, 7, json.dumps(doc['amountOf']['year1'], ensure_ascii=False))
        sheet1.write(row, 8, json.dumps(doc['amountOf']['year2'], ensure_ascii=False))
        sheet1.write(row, 9, json.dumps(doc['amountOf']['year3'], ensure_ascii=False))
        sheet1.write(row, 10, json.dumps(doc['amountOf']['year4'], ensure_ascii=False))

        row += 1
        count += 1

wb.save('report.xls')

