// A selection of real Google reviews (copied from the previous website's Google reviews widget).
export type Review = { name: string; text: string; lang?: 'en' | 'zh' };

export const reviews: Review[] = [
  {
    name: 'Earheart Fly',
    text: "JPC is a very professional, trustworthy, and responsible contractor that we highly recommend. Our townhouse had several leaking issues, and Jeff's team helped us resolve them one by one… One time when our lower roof was leaking, another company suggested replacing the entire lower roof, whereas JPC found the source of the leak and repaired it. We never had a problem ever since.",
  },
  {
    name: 'Skyler H',
    text: 'Big thanks to Jeff and his amazing team at JPC for their hard work fixing my chimney and doing such a great job with the basement renovations! They were professional, friendly, and always willing to go the extra mile to make sure everything was done right.',
  },
  {
    name: 'Dan He',
    lang: 'zh',
    text: '我家主卧室的衣帽间地毯上发现渗水了，花了半个月时间都没找到其根源……蒋老板立刻带了检测仪器赶到我家，那时已是晚上八点半了，他晚饭都不吃就开始检测，找到了漏水的原因，第二天下午公司水工师傅就上门更换好了。JPC Services Inc 从老板到员工工作效率之高、服务态度之好，值得我们信赖！',
  },
  {
    name: 'Cs King',
    text: 'Thanks to Jeff and Team to help to restore the pathway to the same level which sank after the initial restoration. I called Jeff after I noticed one part of the pavement sank again and Jeff arranged his team to fix up the issue with no hesitation. Great after-sales and maintenance support.',
  },
  {
    name: 'Huizhen Xu',
    lang: 'zh',
    text: '高效、可靠，超出了我的期待！我家的雨水管堵塞很久，每次一下雨車庫就會進水。從頭到尾，他們的服務都非常專業、高效又細心。不僅把嚴重堵塞的水管徹底清理乾淨，還額外檢查了其他地方，細心指出潛在問題並一併幫我處理好。',
  },
  {
    name: 'Gao Haylee',
    text: 'Big thanks to Jeff — a man of integrity and principle! His professionalism, attitude, and way of doing things have truly inspired me. From now on, whenever I run into tough problems, I know I’ll only turn to Jeff and JPC Services.',
  },
];
