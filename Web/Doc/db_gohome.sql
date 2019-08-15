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
   UserName             varchar(20) comment '�û���',
   upwd                 varchar(32) comment '����',
   phone                varchar(20) comment '�ֻ���',
   email                varchar(20) comment '����',
   realName             varchar(20) comment '��ʵ����',
   cardID               varchar(18) comment '����֤��',
   sex                  int comment '�Ա�0��Ů��1���У�',
   birthday             varchar(12) comment '��������',
   isHoster             int comment '�Ƿ�Ϊ������0����1���ǣ�',
   point                int comment '����',
   porn                 varchar(20) comment '������',
   porned               varchar(20) comment '��������',
   primary key (id)
);

alter table home_business_User comment '�û���';

/*==============================================================*/
/* Table: home_business_house                                   */
/*==============================================================*/
create table home_business_house
(
   id                   int not null auto_increment comment 'ID',
   roomSize             double comment '���',
   daId                 int comment '����id',
   aId                  int comment '��������id',
   address              varchar(100) comment '��ϸ��ַ',
   houseTypeId          int comment '��������id',
   rentalTypeId         int comment '��������id',
   toiletId             int comment '����������id',
   peopleNumber         int comment '�˾�����',
   houseTitle           varchar(100) comment '��Դ����',
   traffic              varchar(500) comment '��ͨ���',
   normalPrice          decimal(10,2) comment '�����۸�',
   festivalPrice        decimal(10,2) comment '�ڼ��ռ۸�',
   specialPrice         decimal(10,2) comment '�ؼ۷�',
   isCash               int comment '�Ƿ���Ѻ��0����1���ǣ�',
   cashMoney            decimal(10,2) comment 'Ѻ����',
   otherMoney           varchar(200) comment '��������',
   otherAsk             varchar(200) comment '����Ҫ��',
   longitude            varchar(20) comment '经度',
   latitude             varchar(20) comment '纬度',
   primary key (id)
);

alter table home_business_house comment '���ݱ�';

/*==============================================================*/
/* Table: home_business_house_bed                               */
/*==============================================================*/
create table home_business_house_bed
(
   id                   int not null auto_increment,
   hId                  int comment '����id',
   bId                  int comment '����id',
   primary key (id)
);

alter table home_business_house_bed comment '����--���̱�';

/*==============================================================*/
/* Table: home_business_house_collect_img                       */
/*==============================================================*/
create table home_business_house_collect_img
(
   id                   int not null auto_increment,
   uId                  int comment '�û�id',
   hId                  int comment '����id',
   primary key (id)
);

alter table home_business_house_collect_img comment '�ղر�';

/*==============================================================*/
/* Table: home_business_house_img                               */
/*==============================================================*/
create table home_business_house_img
(
   id                   int not null auto_increment comment 'id',
   hId                  int comment '����id',
   ImgUrl               varchar(50) comment 'ͼƬURL',
   ImgSize              varchar(10) comment 'ͼƬ��С��sm/md/lg',
   primary key (id)
);

alter table home_business_house_img comment '����ͼƬ��';

/*==============================================================*/
/* Table: home_business_house_install                           */
/*==============================================================*/
create table home_business_house_install
(
   id                   int not null auto_increment comment 'int',
   hId                  int comment '����id',
   installId            int comment '��ʩid',
   primary key (id)
);

alter table home_business_house_install comment '����--��ʩ��';

/*==============================================================*/
/* Table: home_business_house_msg                               */
/*==============================================================*/
create table home_business_house_msg
(
   id                   int not null auto_increment comment 'id',
   uId                  int comment '�û�id',
   hId                  int comment '����id',
   msgContent           varchar(100) comment '��Ϣ����',
   primary key (id)
);

alter table home_business_house_msg comment '֪ͨ��';

/*==============================================================*/
/* Table: home_business_orderList                               */
/*==============================================================*/
create table home_business_orderList
(
   id                   int not null auto_increment comment 'id',
   orderId              varchar(50) comment '�������',
   uId                  int comment '�û�id',
   hid                  int comment '����id',
   checkinDate          varchar(20) comment '��סʱ��',
   checkoutDate         varchar(20) comment '�뿪ʱ��',
   realName             varchar(20) comment '��ס����ʵ����',
   cardID               varchar(18) comment '��ס������֤��',
   phone                varchar(20) comment '��ס���ֻ���',
   peopleNumber         int comment '��ס����',
   days                 int comment '��ס����',
   payStatus            int comment '����״̬��0��δ���1���Ѹ���',
   payTime              varchar(50) comment '����ʱ��',
   orderPrice           decimal(10,2) comment '�����۸�',
   orderStatus          int comment '����״̬��1����֧����2������ס��3����ס�У�4������ɣ�5����ȡ��',
   primary key (id)
);

alter table home_business_orderList comment '������';

/*==============================================================*/
/* Table: home_dic_apartment                                    */
/*==============================================================*/
create table home_dic_apartment
(
   id                   int not null auto_increment comment 'id',
   bedroom              int comment '��',
   saloon               int comment '��',
   toilet               int comment '������',
   kitchen              int comment '����',
   balcony              int comment '��̨',
   primary key (id)
);

alter table home_dic_apartment comment '���ͱ�';

/*==============================================================*/
/* Table: home_dic_area                                         */
/*==============================================================*/
create table home_dic_area
(
   id                   int not null auto_increment comment 'id',
   aTypeName            varchar(50) comment '�������ƣ������֡�������',
   aParentId            int comment '�����������ְ֣�',
   aType                int comment '����0/������1',
   primary key (id)
);

alter table home_dic_area comment '������';

/*==============================================================*/
/* Table: home_dic_bed                                          */
/*==============================================================*/
create table home_dic_bed
(
   id                   int not null auto_increment comment 'id',
   bedType              varchar(20) comment '���ͣ����˴���˫�˴��ȣ�',
   width                int comment '��',
   extent               int comment '��',
   num                  int comment '����',
   description          varchar(200) comment '����',
   primary key (id)
);

alter table home_dic_bed comment '������Ϣ��';

/*==============================================================*/
/* Table: home_dic_installation                                 */
/*==============================================================*/
create table home_dic_installation
(
   id                   int not null auto_increment comment 'id',
   installName          varchar(20) comment '��ʩ����',
   installType          int comment '��ʩ���ͣ�1����ԡ��2��������3����ʩ��4��Ҫ��',
   fontStyle            varchar(20) comment 'ͼ����������',
   primary key (id)
);

alter table home_dic_installation comment '������ʩ��';

/*==============================================================*/
/* Table: home_dic_type                                         */
/*==============================================================*/
create table home_dic_type
(
   id                   int not null auto_increment,
   typeName             varchar(50) comment '��������',
   description          varchar(200) comment '����',
   dicType              int comment '1:�������ͣ�2�������ͣ�3������������',
   primary key (id)
);

alter table home_dic_type comment '�������͡��������͡�����������';





