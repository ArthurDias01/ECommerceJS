import React, { useState } from "react";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import { AppBar, Paper, Button, CardMedia } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";

import Carousel from "react-material-ui-carousel";

import Product from "./Product/Product";

import useStyles from "./styles";

const Products = ({ products, onAddToCart, categories }) => {
  const classes = useStyles();

  const [categoryFiltered, setCategoryFiltered] = useState([]);
  const [open, setOpen] = useState(false);

  if (!products.length) return <p>Loading...</p>;

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const filterCategory = (category) => {
    setCategoryFiltered(category);
  };

  let categoryName = {};
  const productsWithCategories = products.map((item) => {
    categoryName = { ...item.categories };
    return { ...item, category: { ...categoryName[0] } };
  });

  const filtered = productsWithCategories.filter((item) => {
    if (categoryFiltered != "") {
      return item.category.name == `${categoryFiltered}`;
    }
    return true;
  });

  function Item(props) {
    const { source } = props.item.media;
    const { name } = props.item.name;
    return (
      <Paper className={classes.carouselpaper}>
        <Typography variant="h4">{props.item.name}</Typography>
        <CardMedia
          component="img"
          className={classes.media}
          image={source}
          title={name}
          height={100}
          container
        />
        <Button className="CheckButton">Confira já!</Button>
      </Paper>
    );
  }

  return (
    <>
      <div className={classes.toolbar} />
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ marginTop: 60, backgroundColor: "white" }}
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}
            style={{ color: "#000" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Divider />
        <List>
          <Typography className={classes.drawerTitle} gutterBottom variant="h4">
            Categorias
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
          {categories.map((category, index) => (
            <ListItem
              button
              key={category.id}
              onClick={() => filterCategory(category.name)}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
          <ListItem button onClick={() => filterCategory([])}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            Limpar Filtros
          </ListItem>
        </List>
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} justify="center" spacing={3} alignItems="center">
            <Carousel>
              {filtered.map((item, i) => (
                <Item key={i} item={item} />
              ))}
            </Carousel>
          </Grid>
          {filtered.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={2}>
              <Product product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))}
        </Grid>
      </main>
    </>
  );
};

export default Products;
