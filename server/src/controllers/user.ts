import { Request, Response, NextFunction } from "express";

/**
 * GET /login
 * Login page.
 */
export let getPage = (req: Request, res: Response) => {
  res.render("user", {
    title: "A user page"
  });
};
