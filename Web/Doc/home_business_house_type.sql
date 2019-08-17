USE db_GoHome;
-- 房屋类型
INSERT INTO home_dic_type VALUES(NULL,'民宅','通常指居民楼中的一套住宅',1);
INSERT INTO home_dic_type VALUES(NULL,'普通公寓','属于商业地产，个人房东经营的公寓型住宅',1);
INSERT INTO home_dic_type VALUES(NULL,'酒店式公寓','属于商业地产，职业团队经营的公寓型住宅，提供定期保洁、前台咨询等酒店式服务',1);
INSERT INTO home_dic_type VALUES(NULL,'精品客栈','属于商业地产，具备完善的酒店服务系统，装修具有独特品牌风格或主题文化',1);
INSERT INTO home_dic_type VALUES(NULL,'乡村民宿','乡村民宿地处于郊区，能够让房客感受自然风光，乡村风情',1);
INSERT INTO home_dic_type VALUES(NULL,'别墅','豪华大面积型住宅，通常拥有室外空间',1);
INSERT INTO home_dic_type VALUES(NULL,'轰趴房','用于多人举办聚会，派对等活动的房源，通常带有桌游、卡拉ok等娱乐设施',1);


--出租类型
INSERT INTO home_dic_type VALUES(NULL,'整套出租','房客独享整套房屋',2);
INSERT INTO home_dic_type VALUES(NULL,'独立单间','房客拥有一个独立的房间，但部分空间与他人分享',2);
INSERT INTO home_dic_type VALUES(NULL,'合住房间','房客与他人共住一个房间，没有独立的卧室（如：床位、沙发等）',2);

--卫生间类型			
INSERT INTO home_dic_type VALUES(NULL,'独立卫生间','房客独享的卫生间',3);
INSERT INTO home_dic_type VALUES(NULL,'共用卫生间','可能与他人分享的卫生间',3);