import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Divider,
  ListItemButton,
  Popover,
  Stack,
  styled,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const MyLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
  textTransform: "capitalize",
}));

function AvatarNav({ src }) {
  const avatarRef = useRef(null);
  const [open, setOpen] = useState(false);
  function handlePopEvent() {
    setOpen((prev) => !prev);
  }

  const links = [
    {
      name: "view profile",
      link: "/profile",
    },
    
    {
      name: "my donations",
      link: "/donations",
    },
    {
      name: "my requests",
      link: "/requests",
    },
  ];
  return (
    <div>
      <div
        ref={avatarRef}
        aria-owns={open ? "avatar-pop-over" : undefined}
        aria-haspopup={`${open}`}
        onClick={handlePopEvent}
      >
        <AvatarLogo src={src} />
      </div>
      <Popover
        id="avatar-pop-over"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchorEl={open ? avatarRef.current : null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Stack>
          {links.map((item, i) => (
            <MyLink to={item.link} key={i}>
              <ListItemButton>{item.name}</ListItemButton>
              <Divider />
            </MyLink>
          ))}
        </Stack>
      </Popover>
    </div>
  );
}

function AvatarLogo({ src, ...props }) {
  const [url, setUrl] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const controller = new AbortController();
    fetch(src, { signal: controller.signal })
      .then(async (res) => {
        const img = await res.blob();
        setUrl(URL.createObjectURL(img));
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      controller.abort("unmount");
    };
  }, [src]);
  return (
    <Avatar
      sx={{
        borderRadius: "100%",
        border: `2.25px solid ${theme.palette.divider}`,
        ...props,
      }}
      src={!!url ? url : undefined}
    />
  );
}

export { AvatarLogo };

export default AvatarNav;
