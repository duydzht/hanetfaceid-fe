import { oddArrayNumberFromRange, evenArrayNumberFromRange } from "../utils";

const s12Colors = {
  // Đại biểu đương nhiên, chỉ định Tỉnh đoàn
  dbdn: "#d99594",
  // Đại biểu Thành phố Tuyên Quang
  tptq: "#548dd4",
  // Đại biểu huyện Na hang
  nahang: "#ffff00",
  //Đại biểu huyện Sơn Dương
  sonduong: "#9bbb59",
  // Đại biểu huyện Lâm Bình
  lambinh: "#7030a0",
  // Đại biểu huyện Chiêm Hóa
  chiemhoa: "#e36c09",
  //Đại biểu huyện Hàm Yên
  hamyen: "#00b050",
  //Đại biểu Công an, Quân đội
  caqd: "#7f7f7f",
  // Đại biểu huyện Yên Sơn
  yenson: "#0070c0",
  // Đại biểu Đoàn khối các cơ quan và doanh nghiệp tỉnh
  cqdn: "#ff0000",
};

const s3Colors = {
  //Đại biểu Các Hội, CLB, Trung tâm; Báo, Đài Trung ương và địa phương
  baodai: "#548dd4",
  // Đại biểu đương nhiên, chỉ định Tỉnh đoàn
  dbdn: "#c4bd97",
  // Đại biểu huyện Lâm Bình
  lambinh: "#ffff00",
  // Đại biểu huyện Chiêm Hóa
  chiemhoa: "#7030a0",
  //Đại biểu đại biểu các Ban Trung ương Đoàn; Lãnh đạo Tỉnh đoàn Tuyên Quang qua các thời kỳ; Lãnh đạo các tỉnh đoàn cụm MNĐB, kết nghĩa
  tw: "#c0504d",
  // Đại biểu huyện Na hang
  nahang: "#76923c",
  // Đại biểu Thành phố Tuyên Quang
  tptq: "#0070c0",
  //Đại biểu huyện Hàm Yên
  hamyen: "#ff0000",
  //Đại biểu LĐ văn phòng, các Ban Đảng Tỉnh ủy;Các Ban HĐND, VP UBND tỉnh; Các Huyện, Thành ủy, Đảng ủy trực thuộc Tỉnh ủy
  vanphong: "#92cddc",
  //Đại biểu Công an, Quân đội
  caqd: "#7f7f7f",
  //Đại biểu huyện Sơn Dương
  sonduong: "#00b050",
  //Đại biểu Các Sở, ban, ngành, đoàn thể tỉnh
  sbn: "#ccc0d9",
  // Đại biểu Đoàn khối các cơ quan và doanh nghiệp tỉnh
  cqdn: "#632423",
  // Đại biểu huyện Yên Sơn
  yenson: "#e36c09",
};

export const s12Notes = [
  {
    name: "Đại biểu đương nhiên, chỉ định Tỉnh đoàn",
    color: s12Colors.dbdn,
  },
  {
    name: "Đại biểu Thành phố Tuyên Quang",
    color: s12Colors.tptq,
  },
  {
    name: "Đại biểu huyện Na hang",
    color: s12Colors.nahang,
  },
  {
    name: "Đại biểu huyện Sơn Dương",
    color: s12Colors.sonduong,
  },
  {
    name: "Đại biểu huyện Lâm Bình",
    color: s12Colors.lambinh,
  },
  {
    name: "Đại biểu huyện Chiêm Hóa",
    color: s12Colors.chiemhoa,
  },
  {
    name: "Đại biểu huyện Hàm Yên",
    color: s12Colors.hamyen,
  },
  {
    name: "Đại biểu Công an, Quân đội",
    color: s12Colors.caqd,
  },
  {
    name: "Đại biểu huyện Yên Sơn",
    color: s12Colors.yenson,
  },
  {
    name: "Đại biểu Đoàn khối các cơ quan và doanh nghiệp tỉnh",
    color: s12Colors.cqdn,
  },
];

export const s3Notes = [
  {
    name: "Đại biểu Các Hội, CLB, Trung tâm; Báo, Đài Trung ương và địa phương",
    color: s3Colors.baodai,
  },
  {
    name: "Đại biểu đương nhiên, chỉ định, Tỉnh đoàn",
    color: s3Colors.dbdn,
  },
  {
    name: "Đại biểu huyện Lâm Bình",
    color: s3Colors.lambinh,
  },
  {
    name: "Đại biểu huyện Chiêm Hóa",
    color: s3Colors.chiemhoa,
  },
  {
    name: "Đại biểu đại biểu các Ban Trung ương Đoàn; Lãnh đạo Tỉnh đoàn Tuyên Quang qua các thời kỳ; Lãnh đạo các tỉnh đoàn cụm MNĐB, kết nghĩa",
    color: s3Colors.tw,
  },
  {
    name: "Đai biểu huyện Na Hang",
    color: s3Colors.nahang,
  },
  {
    name: "Đại biểu Thành phố Tuyên Quang",
    color: s3Colors.tptq,
  },
  {
    name: "Đại biểu huyện Hàm Yên",
    color: s3Colors.hamyen,
  },
  {
    name: "Đại biểu LĐ văn phòng, các Ban Đảng Tỉnh ủy;Các Ban HĐND, VP UBND tỉnh; Các Huyện, Thành ủy, Đảng ủy trực thuộc Tỉnh ủy",
    color: s3Colors.vanphong,
  },
  {
    name: "Đại biểu Công an, Quân đội",
    color: s3Colors.caqd,
  },
  {
    name: "Đại biểu huyện Sơn Dương",
    color: s3Colors.sonduong,
  },
  {
    name: "Đại biểu Các Sở, ban, ngành, đoàn thể tỉnh",
    color: s3Colors.sbn,
  },
  {
    name: "Đại biểu Đoàn khối các cơ quan và doanh nghiệp Tỉnh",
    color: s3Colors.cqdn,
  },
  {
    name: "Đại biểu huyện Yên Sơn",
    color: s3Colors.yenson,
  },
];

export const SESSION_1_AND_2 = {
  area1: [
    [
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU",
      },
      {
        prefix: "Đ/c",
        name: "Hoàng Trần Trung",
        title: "Phó Bí thư Tỉnh đoàn",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU MỜI",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU MỜI",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU MỜI",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU MỜI",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU MỜI",
      },
      {
        prefix: "Đ/c",
        name: "Dương Minh Nguyệt",
        title: "Bí thư Tỉnh đoàn",
      },
      {
        prefix: "Đ/c",
        name: "Nguyễn Thu Hường",
        title: "Phó Bí thư Thường trực Tỉnh đoàn",
      },
      {
        prefix: "Đ/c",
        name: "Phạm Thị Kiều Trang",
        title: "Phó Bí thư Tỉnh đoàn",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU",
      },
    ],
    [
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU",
      },
      {
        prefix: "Đ/c",
        name: "Hoàng Trần Trung",
        title: "Phó Bí thư Tỉnh đoàn",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU MỜI",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU MỜI",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU MỜI",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU MỜI",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU MỜI",
      },
      {
        prefix: "Đ/c",
        name: "Dương Minh Nguyệt",
        title: "Bí thư Tỉnh đoàn",
      },
      {
        prefix: "Đ/c",
        name: "Nguyễn Thu Hường",
        title: "Phó Bí thư Thường trực Tỉnh đoàn",
      },
      {
        prefix: "Đ/c",
        name: "Phạm Thị Kiều Trang",
        title: "Phó Bí thư Tỉnh đoàn",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU",
      },
      {
        prefix: "",
        name: "",
        title: "ĐẠI BIỂU",
      },
    ],
    ,
  ],
  area2: [
    {
      labels: ["A", "B", "C", "D", "E", "F", "G"],
      values: [
        {
          title: "ĐẠI BIỂU THÀNH PHỐ TUYÊN QUANG",
          totalRows: 4,
          totalSeats: 28,
          bg: s12Colors.tptq,
          range: oddArrayNumberFromRange(15, 27),
        },
        {
          title: "ĐẠI BIỂU HUYỆN NA HANG",
          totalRows: 3,
          totalSeats: 16,
          bg: s12Colors.nahang,
          range: oddArrayNumberFromRange(15, 27),
        },
      ],
    },
    {
      labels: ["A", "B", "C", "D", "E", "F", "G"],
      values: [
        {
          title: "ĐẠI BIỂU ĐƯƠNG NHIÊN, CHỈ ĐỊNH TỈNH ĐOÀN",
          totalRows: 2,
          totalSeats: 14,
          bg: s12Colors.dbdn,
          range: oddArrayNumberFromRange(1, 13),
        },
        {
          title: "ĐẠI BIỂU HUYỆN SƠN DƯƠNG",
          totalRows: 5,
          totalSeats: 35,
          bg: s12Colors.sonduong,
          range: oddArrayNumberFromRange(1, 13),
        },
      ],
    },
    {
      labels: ["A", "B", "C", "D", "E", "F", "G"],
      values: [
        {
          title: "ĐẠI BIỂU HUYỆN CHIÊM HÓA",
          totalRows: 4,
          totalSeats: 28,
          bg: s12Colors.chiemhoa,
          range: evenArrayNumberFromRange(2, 14),
        },
        {
          title: "ĐẠI BIỂU CÔNG AN, QUÂN ĐỘI",
          totalRows: 3,
          totalSeats: 15,
          bg: s12Colors.caqd,
          range: evenArrayNumberFromRange(2, 14),
        },
      ],
    },
    {
      labels: ["A", "B", "C", "D", "E", "F", "G"],
      values: [
        {
          title: "ĐẠI BIỂU HUYỆN YÊN SƠN",
          totalRows: 4,
          totalSeats: 28,
          bg: s12Colors.yenson,
          range: evenArrayNumberFromRange(16, 28),
        },
        {
          title: "ĐẠI BIỂU ĐOÀN KHỐI CÁC CƠ QUAN VÀ DOANH NGHIỆP TỈNH",
          totalRows: 3,
          totalSeats: 20,
          bg: s12Colors.cqdn,
          range: evenArrayNumberFromRange(16, 28),
        },
      ],
    },
  ],
  area3: [
    {
      labels: ["H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"],
      values: [
        {
          title: "ĐẠI BIỂU HUYỆN LÂM BÌNH",
          totalRows: 1,
          totalSeats: 7,
          bg: s12Colors.lambinh,
          range: oddArrayNumberFromRange(15, 27),
        },
      ],
    },
    {
      labels: ["H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"],
      values: [
        {
          title: "ĐẠI BIỂU HUYỆN LÂM BÌNH",
          totalRows: 2,
          totalSeats: 9,
          bg: s12Colors.lambinh,
          range: oddArrayNumberFromRange(1, 13),
        },
      ],
    },
    {
      labels: ["H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"],
      values: [
        {
          title: "ĐẠI BIỂU HUYỆN HÀM YÊN",
          totalRows: 2,
          totalSeats: 14,
          bg: s12Colors.hamyen,
          range: evenArrayNumberFromRange(2, 14),
        },
      ],
    },
    {
      labels: ["H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"],
      values: [
        {
          title: "ĐẠI BIỂU HUYỆN HÀM YÊN",
          totalRows: 2,
          totalSeats: 11,
          bg: s12Colors.hamyen,
          range: evenArrayNumberFromRange(16, 28),
        },
      ],
    },
  ],
};
export const SESSION_3 = {
  area1: [
    [
      {
        prefix: "Đ/c",
        name: "Đặng Văn Long",
        title: "Uỷ viên Ban Thường vụ Tỉnh ủy, Chỉ huy trưởng Bộ CHQS tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "Phạm Kim Đĩnh",
        title: "Uỷ viên Ban Thường vụ Tỉnh ủy, Giám đốc Công an tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "Phùng Tiến Quân",
        title: "Ủy viên Ban Thường vụ Tỉnh ủy, Trưởng ban Nội chính Tỉnh ủy",
      },
      {
        prefix: "Đ/c",
        name: "Nguyễn Hồng Trang",
        title:
          "Ủy viên Ban Thường vụ Tỉnh ủy, Chủ nhiệm Ủy ban Kiểm tra Tỉnh ủy",
      },
      {
        prefix: "Đ/c",
        name: "Nguyễn Hưng Vượng",
        title: "Ủy viên Ban Thường vụ Tỉnh ủy, Trưởng Ban Dân vận",
      },
      {
        prefix: "Đ/c",
        name: "Phạm Thị Minh Xuân",
        title: "Uỷ viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch HĐND tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "Nguyễn Văn Sơn",
        title: "Phó Bí thư Tỉnh ủy, Chủ tịch Ủy ban nhân dân tỉnh Tuyên Quang",
      },
      {
        prefix: "Đ/c",
        name: "",
        title: "Bí Thư Trung ương Đoàn",
      },
      {
        prefix: "Đ/c",
        name: "Chẩu Văn Lâm",
        title: "Ủy viên BCH Trung ương Đảng, Bí thư Tỉnh ủy",
      },
      {
        prefix: "Đ/c",
        name: "Hà Quang Dự",
        title:
          "Nguyên UV Trung ương Đảng, Bí thư thứ nhất Trung ương Đoàn, nguyên Bộ trưởng phụ trách...",
      },
      {
        prefix: "Đ/c",
        name: "Lê Thị Kim Dung",
        title: "Phó Bí thư Thường trực Tỉnh ủy tỉnh Tuyên Quang",
      },
      {
        prefix: "Đ/c",
        name: "Ma Thế Hồng",
        title: "Ủy viên Ban Thường vụ Tỉnh ủy, Trưởng Ban tổ chức Tỉnh ủy",
      },
      {
        prefix: "Đ/c",
        name: "Nông Thị Bích Huệ",
        title: "Uỷ viên Ban Thường vụ Tỉnh ủy, Trưởng Ban Tuyên giáo Tỉnh ủy",
      },
      {
        prefix: "Đ/c",
        name: "Tạ Đức Tuyên",
        title: "Uỷ viên Ban Thường vụ Tỉnh ủy, Bí thư Thành ủy Tuyên Quang",
      },
      {
        prefix: "",
        name: "",
        title: "Mẹ VNAH",
      },
      {
        prefix: "",
        name: "",
        title: "Cán bộ tiền khởi nghĩa",
      },
    ],
    [
      {
        prefix: "Đ/c",
        name: "",
        title: "Ủy viên BCH Đảng bộ tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "",
        title: "Ủy viên BCH Đảng bộ tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "",
        title: "Ủy viên BCH Đảng bộ tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "",
        title: "Ủy viên BCH Đảng bộ tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "",
        title: "Ủy viên BCH Đảng bộ tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "Hoàng Việt Phương",
        title: "UVBCH Đảng bộ tỉnh, Phó Chủ tịch UBND tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "Lê Thị Thanh Trà",
        title: "Ủy viên BCH Đảng bộ tỉnh, Phó Chủ tịch HĐND tỉnh",
      },
      {
        prefix: "",
        name: "",
        title: "Thư ký Ban Bí thư Trung ương Đoàn",
      },
      {
        prefix: "Đ/c",
        name: "Nguyễn Văn Dưng",
        title: "Ủy viên BCH Đảng bộ tỉnh, Chánh VP Tỉnh uỷ",
      },
      {
        prefix: "Đ/c",
        name: "Vân Đình Thảo",
        title: "Uỷ viên BTV Tỉnh ủy, Giám đốc Sở KHĐT tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "Nguyễn Mạnh Tuấn",
        title: "UVBCH Đảng bộ tỉnh, Phó Chủ tịch UBND tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "Phạm Thị Kiều Trang",
        title: "Ủy viên BCH Đảng bộ tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "",
        title: "Ủy viên BCH Đảng bộ tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "",
        title: "Ủy viên BCH Đảng bộ tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "",
        title: "Ủy viên BCH Đảng bộ tỉnh",
      },
      {
        prefix: "Đ/c",
        name: "",
        title: "Ủy viên BCH Đảng bộ tỉnh",
      },
    ],
    ,
  ],
  area2: [
    {
      labels: ["A", "B", "C", "D", "E", "F", "G"],
      values: [
        {
          title:
            "ĐẠI BIỂU Các Hội, CLB, Trung tâm; Báo, Đài Trung ương và địa phương",
          totalRows: 3,
          totalSeats: 21,
          bg: s3Colors.baodai,
          range: oddArrayNumberFromRange(15, 27),
        },
        {
          title: "ĐẠI BIỂU ĐƯƠNG NHIÊN, CHỈ ĐỊNH TỈNH ĐOÀN",
          totalRows: 2,
          totalSeats: 12,
          bg: s3Colors.dbdn,
          range: oddArrayNumberFromRange(15, 27),
        },
        {
          title: "ĐẠI BIỂU HUYỆN LÂM BÌNH",
          totalRows: 2,
          totalSeats: 16,
          bg: s3Colors.lambinh,
          range: oddArrayNumberFromRange(15, 27),
        },
      ],
    },
    {
      labels: ["A", "B", "C", "D", "E", "F", "G"],
      values: [
        {
          title:
            "ĐẠI BIỂU Các Ban Trung ương Đoàn; Lãnh đạo Tỉnh đoàn Tuyên Quang qua các thời kỳ; Lãnh đạo các tỉnh đoàn cụm MNĐB, kết nghĩa",
          totalRows: 5,
          totalSeats: 35,
          bg: s3Colors.tw,
          range: oddArrayNumberFromRange(1, 13),
        },
        {
          title: "ĐẠI BIỂU HUYỆN NA HANG",
          totalRows: 2,
          totalSeats: 16,
          bg: s3Colors.nahang,
          range: oddArrayNumberFromRange(1, 13),
        },
      ],
    },
    {
      labels: ["A", "B", "C", "D", "E", "F", "G"],
      values: [
        {
          title:
            "ĐẠI BIỂU LĐ văn phòng, các Ban Đảng Tỉnh ủy;Các Ban HĐND,  VP UBND tỉnh; Các Huyện, Thành ủy, Đảng ủy trực thuộc Tỉnh ủy",
          totalRows: 5,
          totalSeats: 35,
          bg: s3Colors.vanphong,
          range: evenArrayNumberFromRange(2, 14),
        },
        {
          title: "ĐẠI BIỂU CÔNG AN, QUÂN ĐỘI",
          totalRows: 2,
          totalSeats: 15,
          bg: s3Colors.caqd,
          range: evenArrayNumberFromRange(2, 14),
        },
      ],
    },
    {
      labels: ["A", "B", "C", "D", "E", "F", "G"],
      values: [
        {
          title: "ĐẠI BIỂU Các Sở, ban, ngành, đoàn thể tỉnh",
          totalRows: 4,
          totalSeats: 28,
          bg: s3Colors.sbn,
          range: evenArrayNumberFromRange(16, 28),
        },
        {
          title: "ĐẠI BIỂU ĐOÀN KHỐI CÁC CƠ QUAN VÀ DOANH NGHIỆP TỈNH",
          totalRows: 3,
          totalSeats: 21,
          bg: s3Colors.cqdn,
          range: evenArrayNumberFromRange(16, 28),
        },
      ],
    },
  ],
  area3: [
    {
      labels: ["H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"],
      values: [
        {
          title: "ĐẠI BIỂU HUYỆN CHIÊM HÓA",
          totalRows: 4,
          totalSeats: 28,
          bg: s3Colors.chiemhoa,
          range: oddArrayNumberFromRange(15, 27),
        },
      ],
    },
    {
      labels: ["H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"],
      values: [
        {
          title: "ĐẠI BIỂU THÀNH PHỐ TUYÊN QUANG",
          totalRows: 5,
          totalSeats: 28,
          bg: s3Colors.tptq,
          range: oddArrayNumberFromRange(1, 13),
        },
        {
          title: "ĐẠI BIỂU HUYỆN HÀM YÊN",
          totalRows: 4,
          totalSeats: 25,
          bg: s3Colors.hamyen,
          range: oddArrayNumberFromRange(1, 13),
        },
      ],
    },
    {
      labels: ["H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"],
      values: [
        {
          title: "ĐẠI BIỂU HUYỆN SƠN DƯƠNG",
          totalRows: 5,
          totalSeats: 35,
          bg: s3Colors.sonduong,
          range: evenArrayNumberFromRange(2, 14),
        },
      ],
    },
    {
      labels: ["H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"],
      values: [
        {
          title: "ĐẠI BIỂU HUYỆN YÊN SƠN",
          totalRows: 4,
          totalSeats: 28,
          bg: s3Colors.yenson,
          range: evenArrayNumberFromRange(16, 28),
        },
      ],
    },
  ],
};
