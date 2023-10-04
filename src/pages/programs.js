import React from "react";
import { View, Text } from "dripsy";
import DefaultLayout from "../layouts/default";

const DATA = [
  {
    title: "NGÀY 15/8/2022",
    sections: [
      {
        sectionTitle: "Buổi chiều: PHIÊN THỨ NHẤT (Từ 14h00’ đến 17h30’)",
        sectionItems: [
          {
            time: "14h00 - 14h15",
            content: ["Ổn định tổ chức, văn nghệ"],
          },
          {
            time: "14h15 - 14h25",
            content: ["Nghi thức chào cờ"],
          },
          {
            time: "14h25 - 14h35",
            content: ["Tuyên bố lý do, giới thiệu đại biểu"],
          },
          {
            time: "14h35 - 14h45",
            content: [
              "Bầu Đoàn Chủ tịch, Đoàn Thư ký, Ban Thẩm tra tư cách đại biểu",
            ],
          },
          {
            time: "14h45 - 14h55",
            content: ["Thông qua chương trình, nội quy Đại hội"],
          },
          {
            time: "14h55 - 15h05",
            content: ["Báo cáo thẩm tra tư cách đại biểu"],
          },
          {
            time: "15h05 - 15h15",
            content: [
              "Báo cáo các nội dung trọng tâm của Dự thảo báo cáo chính trị",
            ],
          },
          {
            time: "15h15 - 15h30",
            content: ["Báo cáo kiểm điểm Ban Chấp hành nhiệm kỳ 2017 - 2022"],
          },
          {
            time: "15h30 - 16h00",
            content: ["Bầu Ban Chấp hành Tỉnh đoàn khóa XVIII"],
          },
          {
            time: "16h00 - 17h00",
            content: [
              "Tổ chức 03 diễn đàn thảo luận:",
              "Diễn đàn 1: Công tác xây dựng tổ chức Đoàn, tham gia xây dựng Đảng, mở rộng mặt trận đoàn kết tập hợp thanh niên",
              "Diễn đàn 2: Phát huy vai trò xung kích, sáng tạo của thanh niên trên các lĩnh vực của đời sống xã hội",
              "Diễn đàn 3: Đồng hành, hỗ trợ thanh niên khởi nghiệp, lập nghiệp, phát triển kỹ năng xã hội",
            ],
          },

          {
            time: "17h00 - 17h10",
            content: [
              "Công bố kết quả bầu cử Ban Chấp hành Tỉnh đoàn khóa XVIII",
            ],
          },
          {
            time: "17h10 - 17h15",
            content: ["Kết thúc phiên thứ nhất "],
          },
          {
            time: "17h15 - 17h30",
            content: ["Tập duyệt nghi lễ Đại hội"],
          },
        ],
      },
      {
        showTime: true,
        sectionTitle: "Buổi tối (Từ 20h00’ đến 21h30’)",
        sectionItems: [
          {
            time: "20h00 - 21h30",
            content: [
              "Lễ Tuyên dương các công trình và gương thanh niên tiêu biểu nhiệm kỳ 2017 - 2022",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "NGÀY 16/8/2022",
    sections: [
      {
        sectionTitle: "Buổi sáng PHIÊN THỨ HAI (Từ 7h00’ đến 11h30’)",
        sectionItems: [
          {
            time: "7h00 - 7h15",
            content: ["Ổn định tổ chức, chiếu phóng sự"],
          },
          {
            time: "7h15 - 7h45",
            content: ["Chương trình nghệ thuật chào mừng"],
          },
          {
            time: "7h45 - 7h55",
            content: ["Nghi thức chào cờ"],
          },
          {
            time: "7h55 - 8h05",
            content: [
              "Báo cáo tình hình đại biểu tham dự Đại hội và kết quả phiên làm việc thứ nhất",
            ],
          },
          {
            time: "8h05 - 8h15",
            content: ["Diễn văn Khai mạc Đại hội"],
          },
          {
            time: "8h15 - 8h30",
            content: ["Đoàn đại biểu thiếu nhi chào mừng Đại hội"],
          },
          {
            time: "8h30 - 8h55",
            content: [
              "Tóm tắt Dự thảo Báo cáo chính trị của Ban Chấp hành Tỉnh đoàn khóa XVII",
            ],
          },
          {
            time: "8h55 - 9h30",
            content: ["Tham luận tại Hội trường"],
          },
          {
            time: "9h30 - 9h45",
            content: ["Phát biểu chỉ đạo của Lãnh đạo tỉnh"],
          },
          {
            time: "9h45 - 9h50",
            content: [
              "Trao tặng bức trướng của Tỉnh ủy - HĐND -UBND - UBMTTQ tỉnh Hà Tĩnh cho Đoàn TNCS Hồ Chí Minh tỉnh",
            ],
          },
          {
            time: "9h50 - 10h05",
            content: ["Phát biểu chỉ đạo của Lãnh đạo Trung ương Đoàn"],
          },
          {
            time: "10h05 - 10h10",
            content: [
              "Trao tặng cờ thi đua của Chính phủ cho Đoàn TNCS Hồ Chí Minh tỉnh Hà Tĩnh",
            ],
          },
          {
            time: "10h10 - 10h35",
            content: ["Bầu trực tiếp chức danh Bí thư Tỉnh đoàn khóa XVIII"],
          },
          {
            time: "10h35 - 10h50",
            content: ["Đại hội giải lao, chụp ảnh lưu niệm"],
          },
          {
            time: "10h50 - 11h10",
            content: [
              "Công bố kết quả bầu cử Bí thư Tỉnh đoàn và ra mắt Ban Chấp hành Tỉnh đoàn khoá XVIII",
            ],
          },
          {
            time: "11h10 - 11h20",
            content: [
              "Tặng quà các đồng chí Uỷ viên Ban Chấp hành Tỉnh đoàn khoá XVII không tái cử",
            ],
          },
          {
            time: "11h20 - 11h30",
            content: ["Kết thúc phiên thứ hai"],
          },
        ],
      },
      {
        showTime: true,
        sectionTitle:
          "Buổi chiều HỘI NGHỊ BAN CHẤP HÀNH LẦN THỨ NHẤT (Từ 13h30’ đến 14h20’)",
        sectionItems: [
          {
            time: "13h30 - 14h20",
            content: ["HỘI NGHỊ BAN CHẤP HÀNH LẦN THỨ NHẤT"],
          },
        ],
      },
      {
        sectionTitle: "Buổi chiều PHIÊN THỨ BA (từ 14h20’ đến 17h15’)",
        sectionItems: [
          {
            time: "14h20 - 14h30",
            content: ["Ổn định tổ chức"],
          },
          {
            time: "14h30 - 14h40",
            content: ["Tuyên bố lý do, giới thiệu đại biểu"],
          },
          {
            time: "14h40 - 14h45",
            content: [
              "Báo cáo tình hình đại biểu và kết quả Hội nghị Ban chấp hành lần thứ nhất",
            ],
          },
          {
            time: "14h45 - 15h00",
            content: [
              "Báo cáo tổng hợp ý kiến đóng góp vào dự thảo văn kiện trình Đại hội Đoàn toàn quốc lần thứ XII và Dự thảo sửa đổi, bổ sung Điều lệ Đoàn khóa XI",
            ],
          },
          {
            time: "15h00 - 15h25",
            content: ["Tham luận tại Hội trường"],
          },
          {
            time: "15h25 - 15h45",
            content: [
              "Bầu Đoàn đại biểu chính thức dự Đại hội Đoàn toàn quốc lần thứ XII",
            ],
          },
          {
            time: "15h45 - 16h00",
            content: ["Đại hội giải lao"],
          },
          {
            time: "16h00 - 16h05",
            content: [
              "Công bố kết quả bầu cử Đoàn đại biểu dự Đại hội Đoàn toàn quốc lần thứ XII",
            ],
          },
          {
            time: "16h05 - 16h35",
            content: [
              "Bầu đại biểu dự khuyết dự Đại hội Đoàn toàn quốc lần thứ XII",
            ],
          },
          {
            time: "16h35 - 16h40",
            content: [
              "Công bố kết quả bầu cử Đoàn đại biểu dự khuyết dự Đại hội Đoàn toàn quốc lần thứ XII",
            ],
          },
          {
            time: "16h40 - 16h45",
            content: [
              "Ra mắt Đoàn Đại biểu dự Đại hội Đoàn toàn quốc lần thứ XII",
            ],
          },
          {
            time: "16h45 - 17h00",
            content: ["Thông qua dự thảo Nghị quyết Đại hội"],
          },
          {
            time: "17h00 - 17h10",
            content: ["Diễn văn Bế mạc Đại hội"],
          },
          {
            time: "17h10 - 17h15",
            content: ["Nghi thức chào cờ"],
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
