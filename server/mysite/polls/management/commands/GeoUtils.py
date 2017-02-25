'''
Helper for calculating whether a point is inside a shape defined by a list of coordinates. This is used when mapping incidents and institutions to the corresponding zones.

Usage: GeoUtils().isInside(points, p) --> true | false

Source: http://www.geeksforgeeks.org/how-to-check-if-a-given-point-lies-inside-a-polygon/
'''

import math

class GeoUtils:
  INFINITY = 10000

  def __onSegment(self, p, q, r):
    if q[0] <= max(p[0], r[0]) and q[0] >= min(p[0], r[0]) and q[1] <= max(p[1], r[1]) and q[1] >= min(p[1], r[1]):
        return True
    return False

  def __orientation(self, p, q, r):
    val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1])
    if val == 0: return 0
    elif val > 0: return 1
    else: return 2

  def __doIntersect(self, p1, q1, p2, q2):
    o1 = self.__orientation(p1, q1, p2)
    o2 = self.__orientation(p1, q1, q2)
    o3 = self.__orientation(p2, q2, p1)
    o4 = self.__orientation(p2, q2, q1)
    if o1 != o2 and o3 != o4: return True
    if o1 == 0 and self.__onSegment(p1, p2, q1): return True
    if o2 == 0 and self.__onSegment(p1, q2, q1): return True
    if o3 == 0 and self.__onSegment(p2, p1, q2): return True
    if o4 == 0 and self.__onSegment(p2, q1, q2): return True
    return False

  ''' polygons is a list of coordinate tuples
      p is a coordinate point tuple
  '''
  def isInside(self, polygons, p):
    n = len(polygons)
    if n < 3: return False
    extreme = (GeoUtils.INFINITY, p[1])
    condition = True
    count = 0
    i = 0
    while condition:
      next = (i+1)%n
      if self.__doIntersect(polygons[i], polygons[next], p, extreme):
          if self.__orientation(polygons[i], p, polygons[next]) == 0:
             return self.__onSegment(polygons[i], p, polygons[next])
          count = count + 1
      i = next
      condition = (i != 0)
    return count&1

  def distance(self, p1, p2):
    return math.hypot(p2.lat - p1.lat, p2.lon - p1.lon)