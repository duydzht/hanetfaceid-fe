import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import { Pressable, View, Text, Image, useSx, TextInput } from "dripsy";
import DefaultLayout from "../layouts/default";
import { useLayout } from "../hooks/useLayout";
import isEmpty from "lodash/isEmpty";
import HttpClient from "../httpClient";
import get from "lodash/get";
import { STRAPI_ENDPOINT } from "../constants";
import Pagination from "../components/Pagination";
import debounce from "lodash/debounce";

const searchIcon = require("../../assets/search-icon.png");
const PAGE_SIZE = 40;

const ProfileItem = ({ item, width }) => {
  if (isEmpty(item)) return <View sx={{ width }} />;

  const avatarUri = `${STRAPI_ENDPOINT}${get(
    item,
    "attributes.avatar.data.attributes.formats.thumbnail.url"
  )}`;

  const sx = useSx();
  const { avatarSize } = sx({
    avatarSize: [width / 4, width / 3],
  });

  return (
    <Pressable
      sx={{
        width,
        bg: "$white",
        flexDirection: "row",
        mt: "$3",
        borderRadius: [8, 12],
        py: ["$1", "$2"],
        justifyContent: "center",
      }}
    >
      <Image
        source={{ uri: avatarUri }}
        resizeMode={"contain"}
        sx={{
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
        }}
      />
      <View sx={{ flexGrow: 1, px: "$2", justifyContent: "center", flex: 1 }}>
        <Text
          sx={{
            color: "$primary",
            fontSize: [14, 16],
            fontWeight: "600",
          }}
        >
          {get(item, "attributes.name")}
        </Text>
        <Text
          sx={{
            color: "$primary",
            mt: "$2",
            fontWeight: "400",
            fontSize: [12, 14],
          }}
        >
          {get(item, "attributes.donvi")}
        </Text>
      </View>
    </Pressable>
  );
};

export default function Profiles() {
  const { onLayout: onContainerLayout, width: containerWidth } = useLayout();
  const sx = useSx();
  const { columnCount, columnGap } = sx({
    columnCount: [1, 2, 3],
    columnGap: [24, 32],
  });
  const [pagination, setPagination] = useState(null);
  const [faces, setFaces] = useState([]);
  const scrollRef = useRef(null);
  const [keyword, setKeyword] = useState("");

  const fetchData = async ({ page = 1, keyword = "" } = {}) => {
    try {
      const { data, meta: { pagination } = {} } = await HttpClient.get({
        method: "/faces",
        params: {
          populate: ["avatar"],
          sort: ["stt:asc"],
          pagination: {
            page,
            pageSize: PAGE_SIZE,
          },
          ...(keyword && {
            filters: {
              $or: [
                {
                  name: {
                    $contains: keyword,
                  },
                },
                {
                  name: {
                    $containsi: keyword,
                  },
                },
              ],
            },
          }),
        },
      });
      console.log("Profiles.data", data);
      console.log("Profiles.pagination", pagination);
      setFaces(data);
      setPagination(pagination);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const profilesWidth = containerWidth - columnCount * columnGap;

  const data = useMemo(
    () =>
      faces?.concat(
        Array(columnCount - ((faces?.length || 0) % columnCount)).fill({})
      ),
    [columnCount, faces]
  );

  const onPrevious = useCallback(() => {
    if (pagination?.page > 1) {
      fetchData({ page: pagination?.page - 1, keyword });
    }
  }, [pagination, keyword]);

  const onNext = useCallback(() => {
    if (pagination?.page < pagination?.pageCount) {
      fetchData({ page: pagination?.page + 1, keyword });
    }
  }, [pagination, keyword]);

  const debounceSearch = useCallback(
    debounce((nextValue) => fetchData({ keyword: nextValue }), 1000),
    []
  );

  const onChangeText = (value) => {
    setKeyword(value);
    debounceSearch(value);
  };

  return (
    <DefaultLayout
      ref={scrollRef}
      onContainerLayout={onContainerLayout}
      mt={"$3"}
    >
      <View
        sx={{
          bg: "$white",
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          borderRadius: [8, 12],
          px: "$3",
          width: ["80%", "50%"],
        }}
      >
        <Image source={searchIcon} sx={{ width: 24, height: 24 }} />
        <TextInput
          sx={{
            py: "$2",
            ml: "$2",
            pl: "$3",
            flex: 1,
            fontSize: 16,
            fontWeight: "400",
          }}
          value={keyword}
          placeholder={"Tìm kiếm đại biểu"}
          placeholderTextColor={"#ABABAB"}
          onChangeText={onChangeText}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          mt: columnGap,
        }}
      >
        {data.map((item, index) => {
          return (
            <ProfileItem
              key={index}
              item={item}
              width={profilesWidth / columnCount}
            />
          );
        })}
      </View>
      {data?.length > 0 && pagination && (
        <Pagination
          onPrevious={onPrevious}
          onNext={onNext}
          pagination={pagination}
        />
      )}
    </DefaultLayout>
  );
}
