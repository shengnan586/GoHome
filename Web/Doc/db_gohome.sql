/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2019/8/11 18:02:55                           */
/*==============================================================*/

CREATE DATABASE IF NOT EXISTS db_GoHome DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
use db_GoHome;
/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2019/8/11 18:13:46                           */
/*==============================================================*/


/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2019/8/12 9:05:29                            */
/*==============================================================*/


/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2019/8/12 9:22:37                            */
/*==============================================================*/


drop table if exists home_business_User;

drop table if exists home_business_house;

drop table if exists home_business_house_bed;

drop table if exists home_business_house_collect_img;

drop table if exists home_business_house_img;

drop table if exists home_business_house_install;

drop table if exists home_business_house_msg;

drop table if exists home_business_orderList;

drop table if exists home_dic_apartment;

drop table if exists home_dic_area;

drop table if exists home_dic_bed;

drop table if exists home_dic_installation;

drop table if exists home_dic_type;

/*==============================================================*/
/* Table: home_business_User                                    */
/*==============================================================*/
create table home_business_User
(
   id                   int not null auto_increment comment 'ID',
   UserName             varchar(20) comment '用户名',
   upwd                 varchar(20) comment '密码',
   phone                varchar(20) comment '手机号',
   email                varchar(20) comment '邮箱',
   realName             varchar(20) comment '真实姓名',
   cardID               varchar(18) comment '身份证号',
   sex                  int comment '性别（0：女；1：男）',
   birthday             varchar(12) comment '出生日期',
   isHoster             int comment '是否为房东（0：否；1：是）',
   point                int comment '积分',
   porn                 varchar(20) comment '邀请码',
   porned               varchar(20) comment '被邀请码',
   primary key (id)
);

alter table home_business_User comment '用户表';

/*==============================================================*/
/* Table: home_business_house                                   */
/*==============================================================*/
create table home_business_house
(
   id                   int not null auto_increment comment 'ID',
   roomSize             double comment '面积',
   daId                 int comment '户型id',
   aId                  int comment '所属地区id',
   address              varchar(100) comment '详细地址',
   houseTypeId          int comment '房屋类型id',
   rentalTypeId         int comment '出租类型id',
   toiletId             int comment '卫生间类型id',
   peopleNumber         int comment '宜居人数',
   houseTitle           varchar(100) comment '房源标题',
   traffic              varchar(500) comment '交通情况',
   normalPrice          decimal(10,2) comment '正常价格',
   festivalPrice        decimal(10,2) comment '节假日价格',
   specialPrice         decimal(10,2) comment '特价房',
   isCash               int comment '是否收押金（0：否；1：是）',
   cashMoney            decimal(10,2) comment '押金金额',
   otherMoney           varchar(200) comment '其他费用',
   otherAsk             varchar(200) comment '其他要求',
   primary key (id)
);

alter table home_business_house comment '房屋表';

/*==============================================================*/
/* Table: home_business_house_bed                               */
/*==============================================================*/
create table home_business_house_bed
(
   id                   int not null auto_increment,
   hId                  int comment '房屋id',
   bId                  int comment '床铺id',
   primary key (id)
);

alter table home_business_house_bed comment '房屋--床铺表';

/*==============================================================*/
/* Table: home_business_house_collect_img                       */
/*==============================================================*/
create table home_business_house_collect_img
(
   id                   int not null auto_increment,
   uId                  int comment '用户id',
   hId                  int comment '房屋id',
   primary key (id)
);

alter table home_business_house_collect_img comment '收藏表';

/*==============================================================*/
/* Table: home_business_house_img                               */
/*==============================================================*/
create table home_business_house_img
(
   id                   int not null auto_increment comment 'id',
   hId                  int comment '房屋id',
   ImgUrl               varchar(50) comment '图片URL',
   ImgSize              varchar(10) comment '图片大小（sm/md/lg',
   primary key (id)
);

alter table home_business_house_img comment '房屋图片表';

/*==============================================================*/
/* Table: home_business_house_install                           */
/*==============================================================*/
create table home_business_house_install
(
   id                   int not null auto_increment comment 'int',
   hId                  int comment '房屋id',
   installId            int comment '设施id',
   primary key (id)
);

alter table home_business_house_install comment '房屋--设施表';

/*==============================================================*/
/* Table: home_business_house_msg                               */
/*==============================================================*/
create table home_business_house_msg
(
   id                   int not null auto_increment comment 'id',
   uId                  int comment '用户id',
   hId                  int comment '房屋id',
   msgContent           varchar(100) comment '消息内容',
   primary key (id)
);

alter table home_business_house_msg comment '通知表';

/*==============================================================*/
/* Table: home_business_orderList                               */
/*==============================================================*/
create table home_business_orderList
(
   id                   int not null auto_increment comment 'id',
   orderId              varchar(50) comment '订单编号',
   uId                  int comment '用户id',
   hid                  int comment '房屋id',
   checkinDate          varchar(20) comment '入住时间',
   checkoutDate         varchar(20) comment '离开时间',
   realName             varchar(20) comment '入住人真实姓名',
   cardID               varchar(18) comment '入住人身份证号',
   phone                varchar(20) comment '入住人手机号',
   peopleNumber         int comment '入住人数',
   days                 int comment '入住天数',
   payStatus            int comment '付款状态（0：未付款；1：已付款',
   payTime              varchar(50) comment '付款时间',
   orderPrice           decimal(10,2) comment '订单价格',
   orderStatus          int comment '订单状态（1：待支付；2：待入住；3：入住中；4：已完成；5：已取消',
   primary key (id)
);

alter table home_business_orderList comment '订单表';

/*==============================================================*/
/* Table: home_dic_apartment                                    */
/*==============================================================*/
create table home_dic_apartment
(
   id                   int not null auto_increment comment 'id',
   bedroom              int comment '室',
   saloon               int comment '厅',
   toilet               int comment '卫生间',
   kitchen              int comment '厨房',
   balcony              int comment '阳台',
   primary key (id)
);

alter table home_dic_apartment comment '户型表';

/*==============================================================*/
/* Table: home_dic_area                                         */
/*==============================================================*/
create table home_dic_area
(
   id                   int not null auto_increment comment 'id',
   aTypeName            varchar(50) comment '地区名称（区、街、地铁）',
   aParentId            int comment '所属地区（爸爸）',
   aType                int comment '区：0/地铁：1',
   primary key (id)
);

alter table home_dic_area comment '地区表';

/*==============================================================*/
/* Table: home_dic_bed                                          */
/*==============================================================*/
create table home_dic_bed
(
   id                   int not null auto_increment comment 'id',
   bedType              varchar(20) comment '床型（单人床、双人床等）',
   width                int comment '宽',
   extent               int comment '长',
   num                  int comment '个数',
   description          varchar(200) comment '描述',
   primary key (id)
);

alter table home_dic_bed comment '床铺信息表';

/*==============================================================*/
/* Table: home_dic_installation                                 */
/*==============================================================*/
create table home_dic_installation
(
   id                   int not null auto_increment comment 'id',
   installName          varchar(20) comment '设施名称',
   installType          int comment '设施类型（1：卫浴；2：电器；3：设施；4：要求）',
   fontStyle            varchar(20) comment '图标字体类型',
   primary key (id)
);

alter table home_dic_installation comment '配套设施表';

/*==============================================================*/
/* Table: home_dic_type                                         */
/*==============================================================*/
create table home_dic_type
(
   id                   int not null auto_increment,
   typeName             varchar(50) comment '类型名称',
   description          varchar(200) comment '描述',
   dicType              int comment '1:房屋类型；2出租类型；3：卫生间类型',
   primary key (id)
);

alter table home_dic_type comment '房屋类型、出租类型、卫生间类型';





