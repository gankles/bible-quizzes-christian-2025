<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Bible Maximum - XML Sitemap</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style type="text/css">
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  color: #333;
  margin: 0;
  padding: 20px;
  background-color: #f9f9f9;
}
.header {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}
.header h1 {
  color: #2563eb;
  margin: 0 0 10px 0;
  font-size: 24px;
}
.header p {
  margin: 0;
  color: #666;
}
.sitemap-table {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  overflow: hidden;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background-color: #f8f9fa;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
  font-weight: 600;
}
td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}
tr:hover {
  background-color: #f8f9fa;
}
a {
  color: #2563eb;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.priority {
  text-align: center;
  font-weight: 600;
}
.changefreq {
  text-align: center;
  color: #666;
}
.lastmod {
  color: #666;
  font-size: 13px;
}
</style>
</head>
<body>
<div class="header">
  <h1>Bible Maximum - XML Sitemap</h1>
  <p>This sitemap contains <xsl:value-of select="count(sm:urlset/sm:url)"/> URLs for Bible Maximum, your comprehensive Bible quiz platform.</p>
</div>
<div class="sitemap-table">
<table>
<thead>
<tr>
  <th>URL</th>
  <th>Priority</th>
  <th>Change Frequency</th>
  <th>Last Modified</th>
</tr>
</thead>
<tbody>
<xsl:for-each select="sm:urlset/sm:url">
<tr>
  <td>
    <xsl:variable name="itemURL">
      <xsl:value-of select="sm:loc"/>
    </xsl:variable>
    <a href="{$itemURL}">
      <xsl:value-of select="sm:loc"/>
    </a>
  </td>
  <td class="priority">
    <xsl:value-of select="sm:priority"/>
  </td>
  <td class="changefreq">
    <xsl:value-of select="sm:changefreq"/>
  </td>
  <td class="lastmod">
    <xsl:value-of select="sm:lastmod"/>
  </td>
</tr>
</xsl:for-each>
</tbody>
</table>
</div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>