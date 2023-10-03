import React from "react";
import { View, Text } from "dripsy";
import DefaultLayout from "../layouts/default";

const DATA = [
  {
    title: "NGÀY 14/9/2022",
    sections: [
      {
        sectionTitle: "PHIÊN THỨ NHẤT (Từ 6h30' đến 11h30')",
        sectionItems: [
          {
            time: "6h30'-7h15'",
            content: [
              "Dâng hương Đền thờ Bác Hồ, viếng Đài tưởng niệm các Anh hùng liệt sỹ.",
            ],
          },
          {
            time: "7h15'-7h30'",
            content: ["Ổn định tổ chức."],
          },
          {
            time: "7h30'-7h35'",
            content: ["Nghi lễ Chào cờ."],
          },
          {
            time: "7h35'-7h40'",
            content: ["Tuyên bố lý do, giới thiệu đại biểu."],
          },
          {
            time: "7h40'-8h00'",
            content: [
              "Bầu Đoàn Chủ tịch, Đoàn Thư ký Đại hội, Bầu Ban Thẩm tra tư cách đại biểu.",
            ],
          },
          {
            time: "8h00'-8h05'",
            content: ["Thông qua chương trình làm việc của Đại hội."],
          },
          {
            time: "8h05'-8h10'",
            content: ["Thông qua Nội quy, Quy chế làm việc của Đại hội."],
          },
          {
            time: "8h10'-8h15'",
            content: ["Báo cáo kết quả thẩm tra tư cách đại biểu."],
          },
          {
            time: "8h15'-8h30'",
            content: [
              "Báo cáo kiểm điểm của Ban Chấp hành Đoàn TNCS Hồ Chí Minh tỉnh Tuyên Quang khóa XV, nhiệm kỳ 2017-2022 và định hướng thảo luận.",
            ],
          },
          {
            time: "8h30'-8h40'",
            content: [
              "Báo cáo tổng hợp ý kiến gửi về trước Đại hội tham gia vào văn kiện của Đại hội đại biểu toàn quốc Đoàn TNCS Hồ Chí Minh lần thứ XII, nhiệm kỳ 2022-2027, văn kiện Đại hội Đoàn TNCS Hồ Chí Minh tỉnh Tuyên Quang lần thứ XVI, nhiệm kỳ 2022-2027, Điều lệ Đoàn khóa XI (sửa đổi).",
            ],
          },

          {
            time: "8h40'-10h10'",
            content: [
              "Diễn đàn thảo luận, đóng góp ý kiến vào các văn kiện của Đại hội, Điều lệ Đoàn khóa XI (sửa đổi).",
            ],
          },
          {
            time: "10h10'-10h45'",
            content: [
              "Bầu Ban Chấp hành Đoàn TNCS Hồ Chí Minh tỉnh Tuyên Quang khóa XVI, nhiệm kỳ 2022-2027.",
            ],
          },
          {
            time: "10h45’-11h00’",
            content: ["Công tác thi đua khen thưởng."],
          },
          {
            time: "11h00'-11h05'",
            content: [
              "Công bố kết quả bầu cử Ban Chấp hành Đoàn TNCS Hồ Chí Minh tỉnh Tuyên Quang khóa XVI, nhiệm kỳ 2022-2027.",
            ],
          },
          {
            time: "11h05'-11h30'",
            content: [
              "Bầu Bí thư Tỉnh đoàn Tuyên Quang khóa XVI, nhiệm kỳ 2022-2027, Công bố kết quả bầu cử",
            ],
          },
        ],
      },
      {
        // showTime: true,
        sectionTitle: "PHIÊN THỨ HAI (Từ 14h00' đến 17h00')",
        sectionItems: [
          {
            time: "14h00'-15h00'",
            content: [
              "Hội nghị Ban Chấp hành Đoàn TNCS Hồ Chí Minh tỉnh Tuyên Quang khóa XVI, nhiệm kỳ 2022-2027 lần thứ nhất.",
            ],
          },
          {
            time: "15h00'-15h05’",
            content: [
              "Mời Đoàn Chủ tịch lên điều hành Đại hội, Đoàn thư ký lên làm việc.",
            ],
          },
          {
            time: "15h05'-15h10'",
            content: ["Tuyên bố lý do, giới thiệu đại biểu."],
          },
          {
            time: "15h10'-15h15'",
            content: ["Báo cáo tình hình đại biểu dự Đại hội."],
          },
          {
            time: "15h15'-15h25'",
            content: [
              "Báo cáo kết quả phiên họp thứ nhất Ban Chấp hành Đoàn TNCS Hồ Chí Minh tỉnh Tuyên Quang khóa XVI, nhiệm kỳ 2022-2027.",
            ],
          },
          {
            time: "15h25’-15h40’",
            content: [
              "Báo cáo tổng hợp ý kiến đóng góp vào văn kiện của Đại hội đại biểu toàn quốc Đoàn TNCS Hồ Chí Minh lần thứ XII, nhiệm kỳ 2022-2027, văn kiện Đại hội Đoàn TNCS Hồ Chí Minh tỉnh Tuyên Quang lần thứ XVI, nhiệm kỳ 2022-2027, Điều lệ Đoàn khóa XI (sửa đổi)",
            ],
          },
          {
            time: "15h40'-16h10'",
            content: [
              "Bầu Đoàn đại biểu chính thức và dự khuyết dự Đại hội đại biểu toàn quốc Đoàn TNCS Hồ Chí Minh lần thứ XII, nhiệm kỳ 2022-2027.",
            ],
          },
          {
            time: "16h10'-16h45'",
            content: ["Tham luận"],
          },
          {
            time: "16h45'-17h00'",
            content: [
              "Báo cáo kết quả bầu cử Đoàn đại biểu dự Đại hội đại biểu toàn quốc Đoàn TNCS Hồ Chí Minh lần thứ XII, nhiệm kỳ 2022-2027.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "NGÀY 15/9/2022",
    sections: [
      {
        sectionTitle: "PHIÊN THỨ 3 (Từ 7h00' đến 11h30')",
        sectionItems: [
          {
            time: "7h00'-7h30'",
            content: ["Ổn định tổ chức."],
          },
          {
            time: "7h30'-7h55'",
            content: ["Chương trình nghệ thuật."],
          },
          {
            time: "7h55'-8h00'",
            content: ["Nghi lễ chào cờ."],
          },
          {
            time: "8h00'-8h05'",
            content: [
              "Mời Đoàn Chủ tịch lên điều hành Đại hội, Đoàn thư ký lên làm việc.",
            ],
          },
          {
            time: "8h05'-8h10'",
            content: ["Báo cáo tình hình đại biểu dự Đại hội."],
          },
          {
            time: "8h10'-8h25'",
            content: ["Phát biểu của Đoàn Chủ tịch Đại hội."],
          },
          {
            time: "8h25'-8h35'",
            content: ["Đoàn thiếu nhi chào mừng Đại hội."],
          },
          {
            time: "8h35'-8h50'",
            content: [
              "Trình bày tóm tắt dự thảo Báo cáo chính trị trình Đại hội.",
            ],
          },
          {
            time: "8h50'-9h00'",
            content: [
              "Phóng sự một số kết quả nổi bật công tác Đoàn và phong trào Thanh thiếu nhi tỉnh Tuyên Quang nhiệm kỳ 2017-2022.",
            ],
          },
          {
            time: "9h00'-9h20'",
            content: ["Tham luận."],
          },
          {
            time: "9h20'-9h40'",
            content: ["Phát biểu chỉ đạo của Thường trực Tỉnh ủy."],
          },
          {
            time: "9h40'-10h00'",
            content: ["Phát biểu chỉ đạo của Ban Bí thư Trung ương Đoàn."],
          },
          {
            time: "10h00'-10h20'",
            content: [
              "Báo cáo kết quả kỳ họp thứ nhất Hội nghị Ban Chấp hành Đoàn TNCS Hồ Chí Minh tỉnh Tuyên Quang khóa XVI, BCH khóa mới ra mắt Đại hội.",
            ],
          },
          {
            time: "10h20’-10h35'",
            content: ["Nghỉ giải lao, chụp ảnh lưu niệm."],
          },
          {
            time: "10h35'-10h45'",
            content: [
              "Báo cáo kết quả bầu Đoàn Đại biểu dự Đại hội đại biểu toàn quốc Đoàn TNCS Hồ Chí Minh lần thứ XII, nhiệm kỳ 2022-2027, Đoàn đại biểu ra mắt Đại hội.",
            ],
          },
          {
            time: "10h45'-11h05'",
            content: ["Công tác thi đua, khen thưởng."],
          },
          {
            time: "11h05'-11h15'",
            content: [
              "Chia tay các đồng chí Ủy viên Ban Chấp hành khóa XV không tham gia Ban Chấp hành khóa XVI",
            ],
          },
          {
            time: "11h15'-11h20'",
            content: ["Thông qua Nghị quyết Đại hội."],
          },
          {
            time: "11h20'-11h25'",
            content: ["Bế mạc Đại hội."],
          },
          {
            time: "11h25'-11h30'",
            content: [
              "Nghi lễ chào cờ và bài hát “Như có Bác Hồ trong ngày vui đại thắng”.",
            ],
          },
        ],
      },
    ],
  },
];

const Item = ({ time, content, index, showTime }) => {
  return (
    <View sx={{ flexDirection: "row", mt: "$3" }}>
      <Text
        sx={{
          color: "$primary",
          fontWeight: "600",
          fontSize: 14,
        }}
      >
        {showTime ? time : `${index}.`}
      </Text>
      <View sx={{ flexGrow: 1, px: "$3", flex: 1 }}>
        {content.map((item, index) => {
          return (
            <Text
              key={index}
              sx={{
                fontSize: 14,
                flex: 1,
                lineHeight: 18,
                fontWeight: "400",
                ...(content.length > 1 && { pb: "$2" }),
              }}
            >
              {item}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const Section = ({ sectionTitle, sectionItems, showTime = false }) => {
  return (
    <View>
      <View
        sx={{
          flexDirection: "row",
          height: 32,
          alignItems: "center",
          mt: "$3",
        }}
      >
        <View
          sx={{ bg: "$primary", height: "100%", width: 10, borderRadius: 8 }}
        />
        <Text sx={{ color: "$text", pl: 12, fontWeight: "500", fontSize: 16 }}>
          {sectionTitle}
        </Text>
      </View>
      <View sx={{ px: 24 }}>
        {sectionItems.map(({ time, content }, index) => (
          <Item
            key={`item-${index}`}
            index={index + 1}
            time={time}
            content={content}
            showTime={showTime}
          />
        ))}
      </View>
    </View>
  );
};

const Day = ({ mt, title, sections }) => {
  return (
    <View sx={{ bg: "$white", mt, borderRadius: [8, 12], px: "$4", py: "$4" }}>
      <Text sx={{ color: "$text", fontSize: 18, fontWeight: "600" }}>
        {title}
      </Text>
      {sections.map(({ sectionTitle, sectionItems, showTime }, index) => (
        <Section
          key={`section-${index}`}
          sectionTitle={sectionTitle}
          sectionItems={sectionItems}
          showTime={showTime}
        />
      ))}
    </View>
  );
};

export default function Programs(props) {
  return (
    <DefaultLayout borderRadius={[8, 12]}>
      {DATA.map(({ title, sections }, index) => (
        <Day key={`day-${index}`} mt={"$3"} title={title} sections={sections} />
      ))}
    </DefaultLayout>
  );
}
