import React, { useState } from "react";

import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Carousel from "react-material-ui-carousel";
import { Paper, Button, CardMedia } from "@material-ui/core";

import Product from "./Product/Product";
import useStyles from "./styles";

const Products = ({ products, onAddToCart, categories }) => {
  const classes = useStyles();

  const [categoryFiltered, setCategoryFiltered] = useState([]);

  if (!products.length) return <p>Loading...</p>;

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
        <h2>{props.item.name}</h2>
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
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <Typography
              className={classes.drawerTitle}
              gutterBottom
              variant="h4"
            >
              Categorias
            </Typography>
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
        </div>
      </Drawer>

      <Grid container justify="center" spacing={3}>
        <Grid item xs={12} justify="center" spacing={3} alignItems="center">
          <Carousel>
            {filtered.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </Grid>
        {filtered.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
